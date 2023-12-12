// ========================================================================================================================
//  General Analysis/Cleanup Functions
// ========================================================================================================================

// ===== KLC ==============================================================================================================

// ------ FX-1 Created Account but not registered for course
export const klcNoCourseRegistrationFx = (data) => {

    if (!Array.isArray(data) || data.length === 0) {
        console.warn('Input data is not a non-empty array.');
        return [];
      }

    let userInformation = {};

    for (const obj of data) {
        let firstName = obj['First Name'];
        let lastName = obj['Last Name'];
        let email = obj.Email;
        let state = obj.State;
        let courseStatus = obj.Complete;

        let id = `${firstName}-${lastName}-${email}`;

        if (!userInformation[id]) {
            userInformation[id] = {
                'First Name': firstName,
                'Last Name': lastName,
                'Email': email,
                'State': state,
                'Course Status': {
                    'Complete': 0,
                    'RegisterdOnly': 0,
                    'NoRegisterdInfo': 0
                }
            }
        }

        if (courseStatus === true) {
            userInformation[id]['Course Status']['Complete'] += 1;
        } else if (courseStatus === false) {
            userInformation[id]['Course Status']['RegisterdOnly'] += 1;
        } else userInformation[id]['Course Status']['NoRegisterdInfo'] += 1;
    }

    const functionOneOutput = Object.values(userInformation).filter((user) => {
        const completeVar = user['Course Status']['Complete'];
        const registeredOnlyVar = user['Course Status']['RegisterdOnly'];
        const noRegisterdInfoVar = user['Course Status']['NoRegisterdInfo'];

        return completeVar === 0 && registeredOnlyVar === 0 && noRegisterdInfoVar !== 0;
    });

    return functionOneOutput;
};


// ------ FX-2 People who have Created Account and Registered but not completed any courses

export const klcRegistrationNoCompleteFx = (data) => {

    if (!Array.isArray(data) || data.length === 0) {
        console.warn('Input data is not a non-empty array.');
        return [];
      }

    let userInformation = {};

    for (const obj of data) {
        let firstName = obj['First Name'];
        let lastName = obj['Last Name'];
        let email = obj.Email;
        let courseStatus = obj.Complete;
        let state = obj.State;
        let courseName = obj['Resource Name'];
        let courseNumber = obj['Course Id']; 

        let id = `${firstName}-${lastName}-${email}`;

        if (!userInformation[id]) {
            userInformation[id] = {
                'First Name': firstName,
                'Last Name': lastName,
                'Email': email,
                'State': state,
                'CoursesNotComplete': [],
                'CoursesIdNotComplete': [],
                'Course Status': {
                    'Complete': 0,
                    'RegisterdOnly': 0,
                    'NoRegisterdInfo': 0
                }
            }
        }

        if (courseStatus === true) {
            userInformation[id]['Course Status']['Complete'] += 1;
        } else if (courseStatus === false) {
            userInformation[id]['Course Status']['RegisterdOnly'] += 1;
            userInformation[id]['CoursesNotComplete'].push(courseName);
            userInformation[id]['CoursesIdNotComplete'].push(courseNumber);
        } else userInformation[id]['Course Status']['NoRegisterdInfo'] += 1;
    }

    const functionTwoOutput = Object.values(userInformation).filter((user) => {
        const completeVar = user['Course Status']['Complete'];
        const registeredOnlyVar = user['Course Status']['RegisterdOnly'];
        const noRegisterdInfoVar = user['Course Status']['NoRegisterdInfo'];

        return completeVar === 0 && registeredOnlyVar !== 0;
    });

    return functionTwoOutput;
};

// ===== Data Dictionary ==============================================================================================================

// ------ Update with data dictionary comments

export const ddCleanupDeletes = (all, edits) => {
    const deletedIds = all.filter(item => !edits.some(editItem => editItem.id === item.id));
    return deletedIds;
  };



  // ===== Pt Registry Additional  ==============================================================================================================
  export const registryAnalysis = (data) => {
    const result = [];

    data.forEach(item => {
      const existingItem = result.find(obj => obj.id === item.id);
  
      if (existingItem) {
        // If the id already exists, add the color to the existing item
        if (item.variable === 'ckd_cause_detail') {
            const causeExists = existingItem.ckd_cause.some(causeObj => causeObj.cause === item.answer);
        
            if (!causeExists) {
            existingItem.ckd_cause.push({ cause: item.answer });
            }
        } else {
          // If the variable is 'student_yn', update the 'student_yn' property
          existingItem.transplant_kidney_yn = item.answer;
        }
      } else {
        // If the id doesn't exist, create a new object
        const newItem = {
          id: item.id,
          transplant_kidney_yn: item.variable === 'transplant_kidney_yn' ? item.answer : null,
          ckd_cause: item.variable === 'ckd_cause_detail' ? [{ cause: item.answer }] : []
        };
  
        result.push(newItem);
      }
    });
  
    // return result;
    // part 2
    const causeCounts = {};

        // Iterate through each object in the result array
        result.forEach(entry => {
            // Iterate through each cause in the ckd_cause array
            entry.ckd_cause.forEach(causeObj => {
            const cause = causeObj.cause;

            // Initialize counts for the cause if not present
            if (!causeCounts[cause]) {
                causeCounts[cause] = { Yes: 0, No: 0 };
            }

            // Update counts based on transplant_organ_yn value
            if (entry.transplant_kidney_yn === "yes") {
                causeCounts[cause].Yes++;
            } else if (entry.transplant_kidney_yn === "no") {
                causeCounts[cause].No++;
            }
            });
        });

        return causeCounts;
  };