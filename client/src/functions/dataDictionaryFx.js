// ========================================================================================================================
//  Data Dictionary Functions
// ========================================================================================================================

// ----- Same Group and Term

export const dupCheckFx1 = (data) => {
  // Create an object to store the grouped terms
  const groupedTerms = {};

  // Iterate through the input array
  data.forEach((item) => {
    const { Group, Term, "Term Owner": TermOwner, Definition, "Data Source": DataSource, "Duplicate Metric": DuplicateMetric, "Additional Comments": AdditionalComments  } = item;

    // Create a unique key for each term based on its name
    const termKey = `${Group}-${Term}`.toLowerCase();

    // Initialize an array for the term if it doesn't exist
    if (!groupedTerms[termKey]) {
      groupedTerms[termKey] = [];
    }

    // Add the current item to the array for this term
    groupedTerms[termKey].push({
        Group,
        Term,
        "Term Owner": TermOwner,
        Definition,
        "Data Source": DataSource,
        "Duplicate Metric": DuplicateMetric,
        "Additional Comments": AdditionalComments
    });
  });

  // Filter out terms with a count greater than 1
  const filteredTerms = Object.values(groupedTerms).filter(
    (termArray) => termArray.length > 1
  );

  // Calculate the total number of objects and arrays
  const totalObjects = filteredTerms.reduce((count, termArray) => count + termArray.length, 0);
  const totalArrays = filteredTerms.length;

  // Create the one-line sentence
  const sentence = `There are ${totalObjects} number of rows to be checked, and ${totalArrays} number of variables`;

  return { sentence, filteredTerms };
};

// ----- Same Group, Term, Defintion

export const dupCheckFx2 = (data) => {
  // Create an object to store the grouped terms
  const groupedTerms = {};

  // Iterate through the input array
  data.forEach((item) => {
    const { Group, Term, "Term Owner": TermOwner, Definition, "Data Source": DataSource, "Duplicate Metric": DuplicateMetric, "Additional Comments": AdditionalComments  } = item;

    // Create a unique key for each term based on its name
    const termKey = `${Group}-${Term}-${Definition}`.toLowerCase();

    // Initialize an array for the term if it doesn't exist
    if (!groupedTerms[termKey]) {
      groupedTerms[termKey] = [];
    }

    // Add the current item to the array for this term
    groupedTerms[termKey].push({
        Group,
        Term,
        "Term Owner": TermOwner,
        Definition,
        "Data Source": DataSource,
        "Duplicate Metric": DuplicateMetric,
        "Additional Comments": AdditionalComments
    });
  });

  // Filter out terms with a count greater than 1
  const filteredTerms = Object.values(groupedTerms).filter(
    (termArray) => termArray.length > 1
  );

  // Calculate the total number of objects and arrays
  const totalObjects = filteredTerms.reduce((count, termArray) => count + termArray.length, 0);
  const totalArrays = filteredTerms.length;

  // Create the one-line sentence
  const sentence = `There are ${totalObjects} number of rows to be checked, and ${totalArrays} number of variables`;

  return { sentence, filteredTerms };
};


// ----- Same Group, Term, Defintion, Owner

export const dupCheckFx3 = (data) => {
  // Create an object to store the grouped terms
  const groupedTerms = {};

  // Iterate through the input array
  data.forEach((item) => {
    const { Group, Term, "Term Owner": TermOwner, Definition, "Data Source": DataSource, "Duplicate Metric": DuplicateMetric, "Additional Comments": AdditionalComments  } = item;

    // Create a unique key for each term based on its name
    const termKey = `${Group}-${Term}-${Definition}-${TermOwner}`.toLowerCase();

    // Initialize an array for the term if it doesn't exist
    if (!groupedTerms[termKey]) {
      groupedTerms[termKey] = [];
    }

    // Add the current item to the array for this term
    groupedTerms[termKey].push({
        Group,
        Term,
        "Term Owner": TermOwner,
        Definition,
        "Data Source": DataSource,
        "Duplicate Metric": DuplicateMetric,
        "Additional Comments": AdditionalComments
    });
  });

  // Filter out terms with a count greater than 1
  const filteredTerms = Object.values(groupedTerms).filter(
    (termArray) => termArray.length > 1
  );

  // Calculate the total number of objects and arrays
  const totalObjects = filteredTerms.reduce((count, termArray) => count + termArray.length, 0);
  const totalArrays = filteredTerms.length;

  // Create the one-line sentence
  const sentence = `There are ${totalObjects} number of rows to be checked, and ${totalArrays} number of variables`;

  return { sentence, filteredTerms };
};


// ----- Same Group, Term, Defintion, different Owner

export const dupCheckFx4 = (data) => {
// Create an object to store the grouped terms
const groupedTerms = {};

// Iterate through the input array
data.forEach((item) => {
  const {
    Term,
    Definition,
    "Term Owner": TermOwner,
  } = item;

  // Create a unique key for each term based on its name and definition
  const termKey = `${Term}-${Definition}`.toLowerCase();

  // Initialize an array for the term if it doesn't exist
  if (!groupedTerms[termKey]) {
    groupedTerms[termKey] = [];
  }

  // Check if the current Term Owner is not already in the array for this term
  const termArray = groupedTerms[termKey];
  const existingTermOwner = termArray.some((obj) => obj["Term Owner"] === TermOwner);

  // Add the current item to the array for this term only if the Term Owner is different
  if (!existingTermOwner) {
    termArray.push({
      Term,
      Definition,
      "Term Owner": TermOwner,
    });
  }
});

// Filter out terms with a count greater than 1
const filteredTerms = Object.values(groupedTerms).filter(
  (termArray) => termArray.length > 1
);

// Calculate the total number of objects and arrays
const totalObjects = filteredTerms.reduce((count, termArray) => count + termArray.length, 0);
const totalArrays = filteredTerms.length;

// Create the one-line sentence
const sentence = `There are ${totalObjects} number of rows to be checked, and ${totalArrays} number of variables`;

return { sentence, filteredTerms };
};