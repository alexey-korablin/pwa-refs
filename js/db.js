db.collection('recipes').onSnapshot((snapshot) => {
  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    console.log(change.doc.id);
    console.log(change.doc.data());
    if (change.type === 'added') {
      // TODO add the document data to the web page
    }
    if (change.type === 'removed') {
      // TODO remove the document data from the web page
    }
  });
});
