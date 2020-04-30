// offline data
db.enablePersistence().catch((error) => {
  // TODO debugging information. Delete after checking all works correctly
  console.log(error.code);
  if (error.code === 'failed-precondition') {
    // probably multiple tabs open at once
    console.log('persistence failed');
  } else if (error.code === 'unimplemented') {
    // lack of browser support
    console.log('persistence is not available');
  }
});

// real-time listener
db.collection('recipes').onSnapshot((snapshot) => {
  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    console.log(change.doc.id);
    console.log(change.doc.data());
    if (change.type === 'added') {
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      // TODO remove the document data from the web page
    }
  });
});

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection('recipes')
    .add(recipe)
    .catch((error) => console.log(error));

  form.title.value = '';
  form.ingredients.value = '';
});
