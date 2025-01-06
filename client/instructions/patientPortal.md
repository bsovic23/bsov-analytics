Patient Portal

Analysis

-----------------------------
1. Analysis Idea Updates Future
-----------------------------

* Be able to easily select buttons to export data based on what kind of analysis you want to do
* Calculations about how many of each survey 'complete' as well as counts of how many people are at what point
* Retention - At what point is a survey considered "late" can run calculations based on 
* Create functions to identify data that is error / needs to be chekced / can be fixed in other surveys and updated

Sandy 11/22 email
* Fix date format of DOB, and registration date to MM/DD/YYYY
* Create an age formula

-----------------------------
2. Data Merge, Clean and/or Rules
-----------------------------

V5.0 -> Meeting January 8th 2025: Discuss the updates / changes made below (along with any further comments post Brit coding changes for V5.0)

- [] Create a 'rules' document that notes any changes for survey (for now it seems like core survey only one that needs changes)

- [] Can we also add the KDQoL-36 data to the Merged Datasets?
    - () No score documents in the most recent data pulls

- [] Add the scores data sheets for eq5d5l and kdqol now added in the shared folders document, for now add all of the columns/data variables for each of the datasets

- [x] created age variable using the date of birth
    - () Created current age (As years go by dataset can be filtered for current age population if needed by pharma/study etc)
    - () Created age at registration (used for demogrpahic analytics for analysis/stats)

1. Are there certain core survey questions that dont matter if they change (aka should change) so not needing rule writing
       vs
    Are there certain core survey questiosn that DO matter if they change (aka something that shouldnt necessarily change) so needing rule writing

    [] create another excel doc with just 1 core survey (that is cleaned based on certain core survey question cleaning) 

    [] The most recent answer is the correct / accurate  (for any sort of start and stop - lifestyle choices (most recent answer in the survey is the 'correct' one))
    [] Location: most recent answer is the best, we can assume they moved
    [] Employment Status, Education Status, if they changed then that is considered an update the their status

2. What automated metrics are you interested in having?
    [] Monthly completion % ?  YES INCORPORATE INTO THE STATS
    [] Monthyl Counts of surveys completed     YES INCORPORATE INTO THE STATS
    [] Counts of certain variables (ie are certain demographics represented, certain populations, certain types of kidney disease, etc)      YES INCORPORATE INTO THE STATS -> AUTO RUN
    [] Casue of CKD by month ? (X number of cuyase joined each month)

3. Pre-emptively write code to check completion percentage of pre/post a certain date based on when Sandy implrements new outreach email method -> Just need the date whenever that happens
    [x][TBD January] SUBMITTED FOR irb reviw, to tbd january

4. [] Order of the surveys
    i. Registration
    ii. ICF
    iii. core
    iv. eq5d5l
    v. kdqol

5. [] map 
    - detailed information -> cause of ckd
    - demographics (race/ethnicity, gender)

-----------------------------
3. kdqol Issues with scoring/code/answers Brit troubleshoot
-----------------------------

* kdqol
    - kdq36 is the one being used (issue potentially with variable 12, SAS code provided)
    * re code based on the question missing 


* KDQOL scores row G some are above 102 (some may be under 100) based on two columns of answers in the survey: AC / AD (HEMODIALYSIS_PATIENT_ONLY_PROBLEMS_WITH_YOUR_ACCESS_SITE	PERITONEAL_DIALYSIS_PATIENT_ONLY_PROBLEMS_WITH_YOUR_CATHETER_SITE)
    - FIGURE out: why the scoring is high / scoring weight of the variables
    - maybe based on core survey whether on hemodialuysis patient or peritoneal dialysis
    - look at the scoring potential based on if on dialysis vs not on dialysis


* KDQOL and EQ5D5L run QAQC on the scores to see if they are accurate or not accurate (and if not accurate what variables are causing issues)

-----------------------------
4. Sandy Additional Questions For Meeting 1/5/2025
-----------------------------

- I rename variables with a prefix / shorter variable name for my benefit (I know what form the variable from, short and sweet variables)
    [] Keep my way
    [] keep prefix but have the old variable name ex:  reg_REGISTRATION_FIRST_NAME rather than reg_firstName
    [] Go back to the old variable name

- Do you have the stat numbers for completion ? I would like to compare vs my stats, I know they may not be exact
since yours might be delayed, but i just want to make sure im in the realm to ensure theres no code issue on my end