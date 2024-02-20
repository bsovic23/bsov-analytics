// xAPI function

export const xAPIstatement = (actor, verb, action) => {
    return {
        actor: {
            name: actor
        },
        verb: {
            id: 'http://adlnet.gov/expapi/verbs/' + verb,
            display: {
                'en-US': verb
            }
        },
        object: {
            id: 'http://bsov-analytics.com' + action,
            defintion: {
                name: {
                    'en-US': action
                }
            }
        }
    };
};
