export interface JobListData {
    jobId: number,
    Stage: string,
    Action: string,
    DateTime: Date,
    ActionBy: string,
    HoursSpent: number,
    orderBy: string,
    orderByDescending: boolean,
    allRecords: boolean,
    page: number,
    limit: number
}