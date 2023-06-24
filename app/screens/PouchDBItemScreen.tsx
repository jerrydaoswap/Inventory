import React, { useCallback, useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import commonStyles from '@app/utils/commonStyles';

import type { StackParamList } from '@app/navigation/MainStack';
import { useRootNavigation } from '@app/navigation/RootNavigationContext';

import useDB from '@app/hooks/useDB';

import InsetGroup from '@app/components/InsetGroup';
import ScreenContent from '@app/components/ScreenContent';

function PouchDBItemScreen({
  navigation,
  route,
}: StackScreenProps<StackParamList, 'PouchDBItem'>) {
  const { db } = useDB();
  const id = route.params.id;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    (PouchDB.Core.IdMeta & PouchDB.Core.GetMeta) | null
  >(null);

  const rootNavigation = useRootNavigation();

  const getData = useCallback(async () => {
    if (!db) return;
    setLoading(true);
    try {
      const results = await db.get(id);
      setData(results);
    } catch (e: any) {
      Alert.alert(e?.message);
    } finally {
      setLoading(false);
    }
  }, [db, id]);
  useEffect(() => {
    getData();
  }, [getData]);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData]),
  );

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getData();
    } catch (e: any) {
      Alert.alert(e?.message);
    } finally {
      setRefreshing(false);
    }
  }, [getData]);

  const handleRemove = useCallback(() => {
    if (!data) return;

    Alert.alert(
      'Confirm',
      `Are you sure you want to remove document "${data._id}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!db) {
              Alert.alert('Error', 'Database is not available.');
              return;
            }
            try {
              await db.remove(data._id, data._rev);
              navigation.goBack();
            } catch (e: any) {
              Alert.alert(e?.message);
            }
          },
        },
      ],
    );
  }, [data, db, navigation]);

  const jsonData = (() => {
    if (!data) return undefined;

    const { _id: _, ...d } = data;
    return JSON.stringify(d, null, 2);
  })();

  return (
    <ScreenContent
      navigation={navigation}
      title={id}
      action1Label={(data && 'Edit') || undefined}
      action1SFSymbolName={(data && 'square.and.pencil') || undefined}
      action1MaterialIconName={(data && 'pencil') || undefined}
      onAction1Press={() =>
        rootNavigation?.navigate('PouchDBPutDataModal', {
          id,
          jsonData,
        })
      }
      action2Label={(data && 'Remove') || undefined}
      action2SFSymbolName={(data && 'trash') || undefined}
      action2MaterialIconName={(data && 'delete') || undefined}
      onAction2Press={handleRemove}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={commonStyles.mt16} />
        <InsetGroup loading={loading}>
          <InsetGroup.Item
            vertical2
            label="ID"
            detail={id}
            detailTextStyle={[commonStyles.devToolsMonospaced]}
          />
          {data && (
            <>
              <InsetGroup.ItemSeparator />
              <InsetGroup.Item
                vertical2
                label="Data"
                detail={JSON.stringify(data, null, 2)}
                detailTextStyle={[commonStyles.devToolsMonospaced]}
              />
            </>
          )}
        </InsetGroup>
      </ScrollView>
    </ScreenContent>
  );
}

export default PouchDBItemScreen;
