// =======================================================================
// General Analysis
// =======================================================================

// ------------------------
// Medication Cleanup
// ------------------------

// import
export interface Medications {
    med: string,
    mrn: number,
    startDate: string,
    stopDate: string
};

export interface MedicationsClean {
    [uniqueMrnMed: string]: {
        mrn: number,
        medType: string,
        medStartDate: string,
        medStopDate: string,
    }
};


export interface EgfrDups {
    mrn: number;
    post_egfrDate: string;
    post_egfrValue?: number;
  }

  export interface UacrDups {
    mrn: number;
    post_uacrDate: string;
    post_uacrValue?: number;
  }

  export interface EgfrFollowUpDups {
    mrn: number;
    followUpEGFRDate: string;
    followUpEGFRValue?: number;
  }

  export interface UacrFollowUpDups {
    mrn: number;
    followUpUACRDate: string;
    followUpUACRValue?: number;
  }