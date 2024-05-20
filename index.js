const getToken = () => {
  try {
    const { v4: uuidv4 } = require("uuid");
    const uuid = uuidv4();
    return uuid;
  } catch (e) {
    // TODO: format the error msg
    console.log(`error is :${e}`);
  }
};

const connectToWallet = async (token, name) => {
  try {
    if (token === "") {
      token = getToken();
    }

    dappToken = token;
    dappName = name;

    const result = await registerDAppToken();
    console.log("registerDAppTokenPromise Promise resolved:", result);
  } catch (error) {
    console.log(`error is :${error}`);
  }
};

const registerDAppToken = async () => {
  const methodCallId = "";
  const methodName = "connectToWallet";
  const methodArgs = [];
  let registerDAppTokenPromise = new Promise((resolve, reject) => {
    const eventListenerFunction = async function (event) {
      try {
        console.log(event);
        const result = await handleReadTransaction(event);
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        window.removeEventListener(
          "kalp:announceDAppToken" + "_" + dappToken,
          eventListenerFunction,
        );
      }
    };
    window.addEventListener(
      "kalp:announceDAppToken" + "_" + dappToken,
      eventListenerFunction,
    );
  });

  var functionObject = {
    dappToken: dappToken,
    dappName: dappName,
    methodArgs: methodArgs,
    methodCallId: methodCallId,
    methodName: methodName,
  };

  var stringFunctionObject = JSON.stringify(functionObject);
  console.log(
    `dapp registerDAppToken functionObject : ${stringFunctionObject}`,
  );

  window.dispatchEvent(
    new CustomEvent("kalp:connectToWallet", {
      detail: stringFunctionObject,
    }),
  );

  return registerDAppTokenPromise;
};

const handleReadTransaction = (event) => {
  return new Promise((resolve, reject) => {
    if (true) {
      console.log(`dapp handleReadTransaction event detail : ${event.detail}`);
      var eventDetail = JSON.parse(event.detail);
      console.log(
        `dapp handleReadTransaction event detail12121 : ${event.detail}`,
        eventDetail,
      );
      resolve(eventDetail.output); // Resolve the Promise if it's a button
      console.log(
        `dapp handleReadTransaction event 12 : ${event.detail}`,
        eventDetail,
      );
    } else {
      reject("Not a button!"); // Reject the Promise if it's not a button
    }
  });
};

const handleEnrollmentId = (event) => {
  return new Promise((resolve, reject) => {
    if (true) {
      console.log(`dapp handleEnrollmentId event detail : ${event.detail}`);
      var eventDetail = JSON.parse(event.detail);
      console.log(
        `dapp handleEnrollmentId event detail12121 : ${event.detail}`,
        eventDetail,
      );
      resolve(eventDetail.result.enrollmentId); // Resolve the Promise if it's a button
      console.log(
        `dapp handleEnrollmentId event 12 : ${event.detail}`,
        eventDetail,
      );
    } else {
      reject("Not a button!"); // Reject the Promise if it's not a button
    }
  });
};

const handleSubmitTransaction = (event) => {
  return new Promise((resolve, reject) => {
    if (true) {
      console.log(
        `dapp handleSubmitTransaction event detail : ${event.detail}`,
      );
      var eventDetail = JSON.parse(event.detail);
      console.log(
        `dapp handleSubmitTransaction event detail12121 : ${event.detail}`,
        eventDetail,
      );
      resolve(eventDetail.output); // Resolve the Promise if it's a button

      console.log(
        `dapp handleSubmitTransaction event 12 : ${event.detail}`,
        eventDetail,
      );
    } else {
      reject("Not a button!"); // Reject the Promise if it's not a button
    }
  });
};

const getEnrollmentIdFromWallet = async () => {
  try {
    if (dappToken === "") {
      throw new Error("Error: no dappToken exists in package");
    }
    const { v4: uuidv4 } = require("uuid");
    const methodCallId = uuidv4();

    const result = await getEnrollmentId(methodCallId);
    console.log("getEnrollmentIdFromWalletPromise Promise resolved:", result);

    return result;
  } catch (error) {
    console.log(`error is :${error}`);
  }
};

const getEnrollmentId = async (methodCallId) => {
  const methodName = "getEnrollmentId";
  const methodArgs = [];
  console.log(`dapp getEnrollmentIdFromWallet`);

  let getEnrollmentIdFromWalletPromise = new Promise((resolve, reject) => {
    const eventListenerFunction = async function (event) {
      try {
        console.log(event);
        const result = await handleEnrollmentId(event);
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        window.removeEventListener(
          "kalp:announceProvider" +
            "_" +
            dappToken +
            "_" +
            methodCallId +
            "_" +
            methodName,
          eventListenerFunction,
        );
      }
    };
    window.addEventListener(
      "kalp:announceProvider" +
        "_" +
        dappToken +
        "_" +
        methodCallId +
        "_" +
        methodName,
      eventListenerFunction,
    );
  });
  var functionObject = {
    dappToken: dappToken,
    dappName: dappName,
    methodArgs: methodArgs,
    methodCallId: methodCallId,
    methodName: methodName,
  };
  var stringFunctionObject = JSON.stringify(functionObject);
  console.log(
    `dapp getEnrollmentIdFromWallet functionObject : ${stringFunctionObject}`,
  );
  window.dispatchEvent(
    new CustomEvent(`kalp:${dappToken}`, { detail: stringFunctionObject }),
  );
  return getEnrollmentIdFromWalletPromise;
};

const submitTransactionFromWallet = async (
  dappToken,
  channelName,
  chaincodeName,
  transactionName,
  transactionParams,
) => {
  try {
    if (dappToken === "") {
      throw new Error("Error: no dappToken exists in package");
    }
    const { v4: uuidv4 } = require("uuid");
    const methodCallId = uuidv4();

    const result = await submitTransaction(
      methodCallId,
      channelName,
      chaincodeName,
      transactionName,
      transactionParams,
    );
    console.log("submitTransactionFromWallet Promise resolved:", result);

    return result;
  } catch (error) {
    console.log(`error is :${error}`);
  }
};

const submitTransaction = async (
  methodCallId,
  channelName,
  chaincodeName,
  transactionName,
  transactionParams,
) => {
  const methodName = "submitTransaction";
  const methodArgs = [
    dappToken,

    channelName,
    chaincodeName,
    transactionName,
    transactionParams,
  ];
  console.log(`dapp submitTransactionFromWallet`);

  let submitTransactionFromWalletPromise = new Promise((resolve, reject) => {
    const eventListenerFunction = async function (event) {
      try {
        console.log(event);
        const result = await handleSubmitTransaction(event);
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        window.removeEventListener(
          "kalp:announceProvider" +
            "_" +
            dappToken +
            "_" +
            methodCallId +
            "_" +
            methodName,
          eventListenerFunction,
        );
      }
    };
    window.addEventListener(
      "kalp:announceProvider" +
        "_" +
        dappToken +
        "_" +
        methodCallId +
        "_" +
        methodName,
      eventListenerFunction,
    );
  });
  var functionObject = {
    dappToken: dappToken,
    dappName: dappName,
    methodArgs: methodArgs,
    methodCallId: methodCallId,
    methodName: methodName,
  };
  var stringFunctionObject = JSON.stringify(functionObject);
  console.log(
    `dapp submitTransactionFromWallet functionObject : ${stringFunctionObject}`,
  );
  window.dispatchEvent(
    new CustomEvent(`kalp:${dappToken}`, { detail: stringFunctionObject }),
  );
  return submitTransactionFromWalletPromise;
};

const readTransactionFromWallet = async (
  dappToken,
  channelName,
  chaincodeName,
  transactionName,
  transactionParams,
) => {
  try {
    if (dappToken === "") {
      throw new Error("Error: no dappToken exists in package");
    }
    const { v4: uuidv4 } = require("uuid");
    const methodCallId = uuidv4();

    const result = await readTransaction(
      methodCallId,
      channelName,
      chaincodeName,
      transactionName,
      transactionParams,
    );
    console.log("readTransactionFromWallet Promise resolved:", result);

    return result;
  } catch (error) {
    console.log(`error is :${error}`);
  }
};

const readTransaction = async (
  methodCallId,
  channelName,
  chaincodeName,
  transactionName,
  transactionParams,
) => {
  const methodName = "readTransaction";
  const methodArgs = [
    dappToken,
    channelName,
    chaincodeName,
    transactionName,
    transactionParams,
  ];
  console.log(`dapp readTransactionFromWallet`);

  let readTransactionFromWalletPromise = new Promise((resolve, reject) => {
    const eventListenerFunction = async function (event) {
      try {
        console.log(event);
        const result = await handleReadTransaction(event);
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        window.removeEventListener(
          "kalp:announceProvider" +
            "_" +
            dappToken +
            "_" +
            methodCallId +
            "_" +
            methodName,
          eventListenerFunction,
        );
      }
    };
    window.addEventListener(
      "kalp:announceProvider" +
        "_" +
        dappToken +
        "_" +
        methodCallId +
        "_" +
        methodName,
      eventListenerFunction,
    );
  });
  var functionObject = {
    dappToken: dappToken,
    dappName: dappName,
    methodArgs: methodArgs,
    methodCallId: methodCallId,
    methodName: methodName,
  };
  var stringFunctionObject = JSON.stringify(functionObject);
  console.log(
    `dapp readTransactionFromWallet functionObject : ${stringFunctionObject}`,
  );
  window.dispatchEvent(
    new CustomEvent(`kalp:${dappToken}`, { detail: stringFunctionObject }),
  );
  return readTransactionFromWalletPromise;
};

const disconnectWallet = async (dappToken) => {
  try {
    if (dappToken === "") {
      throw new Error("Error: no dappToken exists in package");
    }
    const { v4: uuidv4 } = require("uuid");
    const methodCallId = uuidv4();

    const result = await disconnect(methodCallId);
    console.log("readTransactionFromWallet Promise resolved:", result);

    return result;
  } catch (error) {
    console.log(`error is :${error}`);
  }
};

const disconnect = async (methodCallId) => {
  const methodName = "disconnectWallet";
  const methodArgs = [];
  console.log(`dapp disconnectWallet`);

  let disconnectWalletPromise = new Promise((resolve, reject) => {
    const eventListenerFunction = async function (event) {
      try {
        console.log(event);
        const result = await handleReadTransaction(event);
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        window.removeEventListener(
          "kalp:announceProvider" +
            "_" +
            dappToken +
            "_" +
            methodCallId +
            "_" +
            methodName,
          eventListenerFunction,
        );
      }
    };
    window.addEventListener(
      "kalp:announceProvider" +
        "_" +
        dappToken +
        "_" +
        methodCallId +
        "_" +
        methodName,
      eventListenerFunction,
    );
  });
  var functionObject = {
    dappToken: dappToken,
    dappName: dappName,
    methodArgs: methodArgs,
    methodCallId: methodCallId,
    methodName: methodName,
  };
  var stringFunctionObject = JSON.stringify(functionObject);
  console.log(
    `dapp disconnectWalletPromise functionObject : ${stringFunctionObject}`,
  );
  window.dispatchEvent(
    new CustomEvent(`kalp:${dappToken}`, { detail: stringFunctionObject }),
  );
  return disconnectWalletPromise;
};

class FunctionInfo {
  constructor(dappToken, dappName, methodArgs, methodCallId, methodName) {
    this.dappToken = dappToken;
    this.dappName = dappName;
    this.methodArgs = methodArgs;
    this.methodCallId = methodCallId;
    this.methodName = methodName;
  }
}

const handleRegisterDAppTokenProvider = async (event) => {
  const parsedObject = JSON.parse(event.detail);

  const functionInfo = new FunctionInfo(
    parsedObject.dappToken,
    parsedObject.dappName,
    parsedObject.methodArgs,
    parsedObject.methodCallId,
    parsedObject.methodName,
  );
  // TODO: input validation

  chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    if (response.type === `FROM_BACKGROUND_JS:${functionInfo.dappToken}`) {
      console.log("Received message in content script:", response.message);
      console.log(`dappToken :${functionInfo.dappToken}`);

      var result = response.message;
      var stringResult = JSON.stringify(result);
      if (response.message.output) {
        window.addEventListener(
          `kalp:${functionInfo.dappToken}`,
          handleKalpWalletProvider,
        );

        chrome.runtime.sendMessage({
          type: `ENABLE_BACKGROUND_LISTNERS:${functionInfo.dappToken}`,
          message: functionInfo,
        });
      }
      announceDAppToken(functionInfo.dappToken, stringResult);
    }
  });

  chrome.runtime.sendMessage({
    type: "SEND_TO_BACKGROUND_JS",
    message: functionInfo,
  });
};

const connectToWalletListner = () => {
  window.addEventListener(
    "kalp:connectToWallet",
    handleRegisterDAppTokenProvider,
  );
};

const announceDAppToken = (dappToken, result) => {
  var eventListenerMessage = "kalp:announceDAppToken" + "_" + dappToken;

  window.dispatchEvent(
    new CustomEvent(eventListenerMessage, { detail: result }),
  );
};

const getResult = (functionInfo, callback) => {
  var backEnrollmentId;
  if (functionInfo.methodName === "getEnrollmentId") {
    console.log(`for getEnrollmentId : `, functionInfo);
    chrome.runtime.sendMessage(
      {
        type: `GET_ENROLLMENT_ID:${functionInfo.dappToken}`,
        content: functionInfo,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Error sending message:",
            chrome.runtime.lastError.message,
          );
        } else {
          console.log("Received response from background script:", response);
          backEnrollmentId = response;
          console.log(`backEnrollmentId is:${backEnrollmentId}`);
        }
        let res = {
          ...functionInfo,
          result: {
            enrollmentId: backEnrollmentId,
          },
          output: "true",
        };
        callback(res);
      },
    );
  } else if (functionInfo.methodName === "readTransaction") {
    console.log(`for readTransaction :`, functionInfo);
    chrome.runtime.sendMessage({
      type: `READ_TRANSACTION:${functionInfo.dappToken}`,
      content: functionInfo,
    });
    chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
      if (
        response.type === `READ_FROM_BACKGROUND_JS:${functionInfo.dappToken}`
      ) {
        console.log("Received message in content script:", response.message);
        console.log(`dappToken :${functionInfo.dappToken}`);

        result = {
          ...functionInfo,
          output: response.message,
        };
        callback(result);
      }
    });
  } else if (functionInfo.methodName === "submitTransaction") {
    chrome.runtime.sendMessage({
      type: `WRITE_TRANSACTION:${functionInfo.dappToken}`,
      content: functionInfo,
    });
    chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
      if (
        response.type ===
        `TRANSACTION_ID_FROM_BACKGROUND_JS:${functionInfo.dappToken}`
      ) {
        console.log("Received message in content script:", response.message);
        console.log(`dappToken :${functionInfo.dappToken}`);

        result = {
          ...functionInfo,
          output: response.message,
        };
        callback(result);
      }
    });
  } else if (functionInfo.methodName === "disconnectWallet") {
    console.log(`for disconnectWallet :`, functionInfo);
    chrome.runtime.sendMessage({
      type: `DISCONNECT:${functionInfo.dappToken}`,
      content: functionInfo,
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error sending message:",
          chrome.runtime.lastError.message,
        );
      } else {
        console.log("Received response from background script:", response);
      }
      let res = {
        ...functionInfo,
        output: response
      };
      callback(res);
    },);
  }
};

const announceExtension = (functionInfo, result) => {
  console.log(
    "event name",
    "kalp:announceProvider" +
      "_" +
      functionInfo.dappToken +
      "_" +
      functionInfo.methodCallId +
      "_" +
      functionInfo.methodName,
  );
  var eventListenerMessage =
    "kalp:announceProvider" +
    "_" +
    functionInfo.dappToken +
    "_" +
    functionInfo.methodCallId +
    "_" +
    functionInfo.methodName;
  console.log(`eventListenerMessage contenscript : ${eventListenerMessage}`);

  window.dispatchEvent(
    new CustomEvent(eventListenerMessage, { detail: result }),
  );
};

const handleKalpWalletProvider = (event) => {
  const parsedObject = JSON.parse(event.detail);

  const functionInfo = new FunctionInfo(
    parsedObject.dappToken,
    parsedObject.dappName,
    parsedObject.methodArgs,
    parsedObject.methodCallId,
    parsedObject.methodName,
  );
  console.log(`extension requestProvider event.detail bjbaj :${event.detail}`);

  getResult(functionInfo, (result) => {
    var stringResult = JSON.stringify(result);
    console.log(`result contentscript :${JSON.stringify(result)}`);
    announceExtension(functionInfo, stringResult);
  });
};

class KalpWallet {
  constructor(options) {
    this.Popup = options.Popup;
    this.ConnectToWallet = options.ConnectToWallet;
    this.GetEnrollmentId = options.GetEnrollmentId;
    this.SubmitTransaction = options.SubmitTransaction;
    this.ReadTransaction = options.ReadTransaction;
    this.DisconnectWallet = options.DisconnectWallet;
  }
}

const createKalpWallet = (options) => {
  return new KalpWallet(options);
};

const connectToWalletBackgroundListner = (kalpWallet) => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("jjenje disconnect", request)

    if (request.type === "SEND_TO_BACKGROUND_JS") {
      kalpWallet.ConnectToWallet(request.message);
    } else if (request.type === `DISCONNECT:${request.content.dappToken}`) {
      console.log("jjenj12121e disconnect", request)
      const isDisconnect = kalpWallet.DisconnectWallet(request.content.dappName);
      if (isDisconnect) {
        sendResponse("Wallet Disconnected")
      } else {
        sendResponse("An error occured while disconnecting the wallet")
      }
    }
  });
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("jjenje enable", request)
    if (
      request.type === `ENABLE_BACKGROUND_LISTNERS:${request.message.dappToken}`
    ) {
      console.log(
        `ENABLE_BACKGROUND_LISTNERS:${request.message.dappToken} background`,
      );
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === `GET_ENROLLMENT_ID:${request.content.dappToken}`) {
          const enrollmentId = kalpWallet.GetEnrollmentId();
          console.log(`enroll : ${enrollmentId}`);
          sendResponse(enrollmentId);
        } else if (
          request.type === `READ_TRANSACTION:${request.content.dappToken}`
        ) {
          const transaction = kalpWallet.ReadTransaction(request.content);
          console.log(`transaction : `, transaction);
          sendResponse(transaction);
        } else if (
          request.type === `WRITE_TRANSACTION:${request.content.dappToken}`
        ) {
          const transactionId = kalpWallet.SubmitTransaction(request.content);
          console.log(`transaction : ${transactionId}`);
          sendResponse(transactionId);
        }
      });
    }
  });
};

module.exports = {
  handleKalpWalletProvider,
  connectToWalletListner,
  createKalpWallet,
  connectToWalletBackgroundListner,
};
