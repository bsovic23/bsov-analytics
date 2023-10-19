// ========================================================================================================================
//  CKD Functions
// ========================================================================================================================

// Most Recent EGFR vs Stage correctly indicated

export const ckdStageCorrectFx = (data) => {
    let stageCount = { 
        count: 0,
        noCkdWrongCount: 0,
        stageOneWrongCount: 0,
        stageTwoWrongCount: 0,
        stageThreeWrongCount: 0,
        stageFourWrongCount: 0,
        stageESRDWrongCount: 0
    };
    
    for (const obj of data) {
        let egfr = obj.egfr;
        let stage = obj.stage;
        
        stageCount.count++;

        if (stage === 'No CKD (eGFR ≥ 60 with no protein excretion)' && egfr < 60) {
            stageCount.count ++;
            stageCount.noCkdWrongCount ++;
        } else if (stage === 'Stage 1: (eGFR ≥ 90 with abnormal protein excretion)' && egfr < 90) {
            stageCount.count ++;
            stageCount.stageOneWrongCount++;
        } else if (stage === 'Stage 2 (eGFR: 60-89 with abnormal protein excretion): Mild' && (egfr < 60 || egfr > 89)) {
            stageCount.count ++;
            stageCount.stageTwoWrongCount++;
        } else if (stage === 'Stage 3 (eGFR: 30-59): Moderate' && (egfr < 30 || egfr > 59)) {
            stageCount.count ++;
            stageCount.stageThreeWrongCount++;
        } else if (stage === 'Stage 4: (eGFR:  15-29): Severe' && (egfr < 15 || egfr > 29)) {
            stageCount.count ++;
            stageCount.stageFourWrongCount++;
        } else if (stage === 'End stage renal disease' && egfr > 14) {
            stageCount.count++;
            stageCount.stageESRDWrongCount++;
        } else console.log(obj);
    }

    return stageCount;
};