const moment = require('helpers/moment')

module.exports = ({ models, redis }) => ({
  // NOT REMOVE: helper function for save data to redis
  saveReferenceData: async ({
    reference,
    referenceData,
    expire = 3600,
  }) => {
    await redis.hmsetAsync(reference, {
      data: JSON.stringify(referenceData),
    })
    await redis.expireAsync(reference, expire)
  },
  // Example create function (can remove)
  createCcpSourceUserReference: async ({
    ccpSourceId,
    userId,
    the1CardNo,
    the1CardType,
    the1MemberNo,
    firstName,
    lastName,
    dbTxn,
  }) => {
    const value = {
      ccp_source: ccpSourceId,
      user_id: userId,
      user_reference: the1CardNo,
      first_name: firstName,
      last_name: lastName,
      ref_3: the1CardType,
      ref_4: the1MemberNo,
    }
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    const card = await models.CcpSourceUserReference.create(value, options)
    return card
  },
  createPlatformToken: async ({
    id,
    platformId,
    ref1,
    ref2,
    ref3,
    dbTxn,
  }) => {
    const value = {
      id,
      platform_id: platformId,
      ref_1: ref1,
      ref_2: ref2,
      ref_3: ref3,
    }
    const options = {}
    if (dbTxn !== undefined) options.transaction = dbTxn

    const result = await models.PlatformToken.create(value, options)
    return result
  },
  createPlatformUser: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    const result = await models.PlatformUser.create(value, options)
    return result
  },
  createUserActivity: async ({
    id,
    userId,
    platformId,
    activity,
    dbTxn,
  }) => {
    const value = {
      id,
      user_id: userId,
      platform_id: platformId,
      app_id: 'platform',
      activity,
    }
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }
    const resutl = await models.UserActivity.create(value, options)
    return resutl
  },
  addItemStoreUser: async ({
    itemStoreId,
    userId,
    dbTxn,
  }) => {
    const value = {
      item_store_id: itemStoreId,
      user_id: userId,
    }
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }
    const resutl = await models.ItemStoreUser.create(value, options)
    return resutl
  },
  createPlatformExchangeTransaction: async ({
    transId,
    platformId,
    platformTokenId,
    userId,
    itemSaleId,
    qty,
    dbTxn,
  }) => {
    const value = {
      id: transId,
      platform_id: platformId,
      platform_token_id: platformTokenId,
      user_id: userId,
      reward_id: itemSaleId,
      qty,
    }
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }
    const resutl = await models.PlatformExchangeTransaction.create(value, options)
    return resutl
  },
  createUserAndUserCcp: async ({ value, dbTxn }) => {
    const user = await models.User.create(value, { transaction: dbTxn })
    await models.UserCcp.create({
      user_id: user.id,
      ccp: 0,
      ccp_lv1: 0,
      ccp_lv2: 0,
      ccp_lv3: 0,
      timestamp: moment(),
    }, { transaction: dbTxn })
    return user
  },
})
