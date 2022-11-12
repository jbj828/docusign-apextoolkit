import { LightningElement, api } from 'lwc';
import sendEnvelopeWithTemplate from '@salesforce/apex/SendEnvelopeWithTemplateController.sendEnvelopeWithTemplate';

export default class SendEnvelopeWithTemplateComponent extends LightningElement {

  templateId = 'f65039ed-b1d7-4eaf-a3ad-eedd5133105c'; // 'One Signer' template

  @api recordId;
  async handleClick() {
      try {
          console.log("==> SendEnvelopeWithTemplateComponent called...");
          await sendEnvelopeWithTemplate({templateId: this.templateId, recordId: this.recordId});
          console.log("==> Envelope has been sent successfully!, Please check the recipient's email.");
        } catch (error) {
            console.log('Error:', error);
        }
  }
}