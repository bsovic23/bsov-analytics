// ========================================================================================================================
//  KLC Pre/Post Survey Review
// ========================================================================================================================

export const klcModulesFx = (data) => {
    const moduleCount = {};

    for (const obj of data) {

        const module = obj.module;

        if (!moduleCount[module]) {
            moduleCount[module] = {
                count: 0
            };
        }

        moduleCount[module].count ++;
    }

    return moduleCount;
};