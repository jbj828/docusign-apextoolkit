public class SendEnvelopeWithTemplateController {

    @AuraEnabled
    public static void sendEnvelopeWithTemplate(String templateId, Id recordId){

        try {
            // Create an empty envelope
            dfsle.Envelope myEnvelope = dfsle.EnvelopeService.getEmptyEnvelope(
                new dfsle.Entity(recordId)
            );

            // We will use a Salesforce contact record as a Recipient here
            // ** Please add a contact in Salesforce and set the name of that contact(user name) in the sql query.**
            Contact myContact = [SELECT Id, Name, Email FROM Contact WHERE Name = 'contact_user1'];

            // use the Recipient.fromSource method to create the Recipient
            dfsle.Recipient myRecipient = dfsle.Recipient.fromSource(
                myContact.Name,
                myContact.Email,
                null,
                'Signer',
                new dfsle.Entity(myContact.Id) // Source object for the recipient
            );

            // Add a recipient to the envelope
            myEnvelope = myEnvelope.withRecipients(new List<dfsle.Recipient> { myRecipient });

            dfsle.UUID mytemplateId = dfsle.UUID.parse(templateId);

            // Create a new document for the envelope
            dfsle.Document myDocument = dfsle.Document.fromTemplate(myTemplateId, 'first document');

            // Add document to the envelope
            myEnvelope = myEnvelope.withDocuments(new List<dfsle.Document> { myDocument });

            // Send the envelope
            myEnvelope = dfsle.EnvelopeService.sendEnvelope(myEnvelope, true);
        } catch (Exception ex) {
            // TODO: add error handler which throws the error to the lwc component
        }
       
    }
}
