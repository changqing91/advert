import {contractAddress , network} from './config'

let nebPay = new NebPay();
let neb = new nebulas.Neb()
let HttpRequest = nebulas.HttpRequest;
neb.setRequest(new HttpRequest(network));

let to = contractAddress;
let value = '0';

const getStatus = (txhash, resolve, reject) => {
  neb.api.getTransactionReceipt(txhash)
    .then(res => {
      console.info(res)
      if (res.status === 0) { // fail
        reject({message: '交易失败'})
      } else if (res.status === 1) { // success
        resolve({message: '交易成功'})
      } else { // pending
        setTimeout(() => getStatus(txhash, resolve, reject), 2000)
      }
    })
    .catch(res => {
      reject({message: '交易失败'})
    })
}

export const sign = () => {
  let serialNumber;
  let callFunction = 'claim';
  let callArgs = '';
  return new Promise((resolve, reject) => {
    serialNumber = nebPay.call(to, value, callFunction, callArgs, {
      callback: (resp) => {
        if (resp && resp.txhash) {
          return getStatus(resp.txhash, resolve, reject)
          console.info(resp)
        } else {
          reject({message: '交易终止'})
        }
      }
    });
  })
}

export const getSignedStatus = () => {
  return new Promise((resolve, reject) => {
    let callFunction = "isClaimedToday";
    let callArgs = '';
    nebPay.simulateCall(to, value, callFunction, callArgs, {
      callback(res) {
        console.log('isClaimedToday====>', res)
        try {
          if (!res.result) return;
          var result = JSON.parse(res.result);
          resolve({result})
        } catch (e) {
          reject({message: '合约返回数据错误'})
        }
      }
    });
  })
}

export const getCount = () => {
  return new Promise((resolve, reject) => {
    let callFunction = "getClaimCounts";
    let callArgs = '';
    nebPay.simulateCall(to, value, callFunction, callArgs, {
      callback(res) {
        console.log('getCount====>', res)
        try {
          if (!res.result) return;
          var result = JSON.parse(res.result);
          resolve({result})
        } catch (e) {
          reject({message: '合约返回数据错误'})
        }
      }
    });
  })
}

export const getAllAdv = (offset, limit) => {
  return new Promise((resolve, reject) => {
    let callFunction = "getAll";
    let callArgs = JSON.stringify([offset, limit])
    nebPay.simulateCall(to, value, callFunction, callArgs, {
      callback(res) {
        try {
          if (!res.result) return;
          var result = JSON.parse(res.result);
          resolve({result})
          console.info(result)
        } catch (e) {
          reject({message: '合约返回数据错误'})
        }
      }
    });
  })
}

export const addAdv = (id, title, desc, base64, url, suggestValue) => {
  let serialNumber;
  let callFunction = 'add';
  let callArgs = JSON.stringify([id, title, desc, base64, url])
  return new Promise((resolve, reject) => {
    serialNumber = nebPay.call(to, suggestValue, callFunction, callArgs, {
      callback: (resp) => {
        if (resp && resp.txhash) {
          return getStatus(resp.txhash, resolve, reject)
        } else {
          reject({message: '交易终止'})
        }
      }
    });
  })
}
