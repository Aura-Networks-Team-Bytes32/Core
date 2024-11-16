export const litActionCode = `
(async () => {
  const sigShare = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName,
  });
})();
`;

// let resp = await Lit.Actions.runOnce(
//     { waitForResponse: false, name: "otp-verify" },
//     async () => {
//       const url = "http://192.168.253.89:5003/auth/verify-otp";
//       const resp = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: requestBody,
//       }).then((response) => response.status);
//       return resp;
//     }
//   );

// if (resp != 200) {
//  LitActions.setResponse({ response: "OTP verification failed" });
//  return;
// }
