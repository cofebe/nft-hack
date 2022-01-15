import { ethers } from 'ethers';

const getLogs = (receipt, abi) => {
  let iface = new ethers.utils.Interface(abi);
  var logs = receipt.logs.map(log => {
    var parsedLog = null;
    try {
      parsedLog = iface.parseLog(log);
    } catch (e) {
      // console.log('unable to parse log', log, e);
      return null;
    }
    return parsedLog;
  }).filter(log => log !== null);
  return logs;
};

export default {
  getLogs,
};