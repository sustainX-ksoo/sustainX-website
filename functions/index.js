/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendInquiryEmail = functions.firestore
  .document('inquiries/{inquiryId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const msg = {
      to: 'ksoo@sustainx.co.kr',
      from: 'noreply@sustainx.co.kr',
      subject: `[SustainX] 새로운 고객 문의가 접수되었습니다`,
      html: `
        <h3>새로운 문의가 접수되었습니다</h3>
        <ul>
          <li><b>회사명:</b> ${data.company}</li>
          <li><b>담당자명:</b> ${data.name}</li>
          <li><b>이메일:</b> ${data.email}</li>
          <li><b>문의내용:</b> ${data.concern}</li>
        </ul>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log('이메일 전송 성공');
    } catch (error) {
      console.error('이메일 전송 실패:', error);
    }
  });
