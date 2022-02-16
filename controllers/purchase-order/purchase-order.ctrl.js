const CustomError = require('helpers/custom-error')
const logger = require('helpers/logger')
const configs = require('configs')

module.exports = {
  getPurchaseOrder: async ({
    func: { db },
    data: {
      purchaseOrderId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const po = await db.getPurchaseOrder({
        id: purchaseOrderId,
        isInclude: true,
        dbTxn,
      })
      if (!po) throw new CustomError('Purchase order not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      // TODO handle format
      return po
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getPurchaseOrders: async ({
    func: { db },
    data: {
      offset = 0,
      limit = 10,
      searchText,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const pos = await db.getPurchaseOrders({
        offset,
        limit,
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return pos
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createPurchaseOrder: async ({
    func: { db, fs },
    data,
  }) => {
    let dbTxn
    try {
      const _data = { ...data }
      const uploadParams = {
        file: data.bank_slip_image,
        bucketPath: 'bank-slip',
      }
      const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
      if (status !== 'success') {
        throw new CustomError('Upload file fail.')
      } 
      _data.bank_slip_image = filePath
      if (data.receipt_image !== undefined) {
        const uploadParams = {
          file: data.receipt_image,
          bucketPath: 'receipt',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _data.receipt_image = `${configs.baseUrl}/v1/file-system/download?key=${filePath}`
      }
      dbTxn = await db.beginTransaction({ dbTxn })
      const po = await db.createPurchaseOrder({ value: _data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return po
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updatePurchaseOrder: async ({
    func: { db, fs},
    data: {
      purchaseOrderId,
      value,
    },
  }) => {
    let dbTxn
    try {
      const _value = { ...value }
      if (value.bank_slip_image !== undefined) {
        const uploadParams = {
          file: value.bank_slip_image,
          bucketPath: 'bank-slip',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _value.bank_slip_image = filePath
      }
      if (value.receipt_image !== undefined) {
        const uploadParams = {
          file: value.receipt_image,
          bucketPath: 'receipt',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _value.receipt_image = `${configs.baseUrl}/v1/file-system/download?key=${filePath}`
      }
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updatePurchaseOrder({ id: purchaseOrderId, value: _value, dbTxn })
      const po = await db.getPurchaseOrder({ id: purchaseOrderId, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return po
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getPurchaseOrderLists: async ({
    func: { db },
    data: {
      purchaseOrderId
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const pols = await db.getPurchaseOrderLists({
        purchaseOrderId,
        isInclude: true,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return pols
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createPurchaseOrderList: async ({
    func: { db, fs },
    data,
  }) => {
    let dbTxn
    try {
      const _data = { ...data }
      if (data.image !== undefined) {
        const uploadParams = {
          file: data.image,
          bucketPath: 'reward',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _data.image = `${configs.baseUrl}/v1/file-system/download?key=${filePath}`
      }
      dbTxn = await db.beginTransaction({ dbTxn })
      const pol = await db.createPurchaseOrderList({ value: _data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return pol
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updatePurchaseOrderList: async ({
    func: { db, fs },
    data: {
      purchaseOrderListId,
      value,
    },
  }) => {
    let dbTxn
    try {
      const _value = { ...value }
      if (value.image !== undefined) {
        const uploadParams = {
          file: value.image,
          bucketPath: 'reward',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _value.image = `${configs.baseUrl}/v1/file-system/download?key=${filePath}`
      }
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updatePurchaseOrderList({
        id: purchaseOrderListId,
        value: _value,
        dbTxn,
      })
      const po = await db.getPurchaseOrderList({ id: purchaseOrderListId, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return po
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getUtilityPayment: async ({
    func: { db },
    data: {
      utilityPaymentId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const utilPayment = await db.getUtilityPayment({
        id: utilityPaymentId,
        dbTxn,
      })
      if (!utilPayment) throw new CustomError('Utility payment not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      return utilPayment
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getUtilityPayments: async ({
    func: { db },
    data: {
      offset = 0,
      limit = 10,
      searchText,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const utilPayments = await db.getUtilityPayments({
        offset,
        limit,
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return utilPayments
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createUtilityPayment: async ({
    func: { db, fs },
    data,
  }) => {
    let dbTxn
    try {
      const _data = { ...data }
        if (data.bank_slip_image !== undefined) {
        const uploadParams = {
          file: data.bank_slip_image,
          bucketPath: 'bank-slip',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _data.bank_slip_image = filePath
      }
      if (data.receipt_image !== undefined) {
        const uploadParams = {
          file: data.receipt_image,
          bucketPath: 'receipt',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _data.receipt_image = `${configs.baseUrl}/v1/file-system/download?key=${filePath}`
      }
      dbTxn = await db.beginTransaction({ dbTxn })
      const utilPayment = await db.createUtilityPayment({ value: _data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return utilPayment
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updateUtilityPayment: async ({
    func: { db, fs },
    data: {
      utilityPaymentId,
      value,
    },
  }) => {
    let dbTxn
    try {
      const _value = { ...value }
      if (value.bank_slip_image !== undefined) {
        const uploadParams = {
          file: value.bank_slip_image,
          bucketPath: 'bank-slip',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _value.bank_slip_image = filePath
      }
      if (value.receipt_image !== undefined) {
        const uploadParams = {
          file: value.receipt_image,
          bucketPath: 'receipt',
        }
        const { status, file_path: filePath } = await fs.upload({ data: uploadParams })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        _value.receipt_image = `${configs.baseUrl}/v1/file-system/download?key=${filePath}`
      }
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updateUtilityPayment({ id: utilityPaymentId, value: _value, dbTxn })
      const utilPayment = await db.getUtilityPayment({ id: utilityPaymentId, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return utilPayment
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
}
