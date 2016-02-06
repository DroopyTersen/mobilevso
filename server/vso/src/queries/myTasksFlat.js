module.exports = `
SELECT 
	[System.Id], [Microsoft.VSTS.Scheduling.RemainingWork], [System.Title], 
	[System.State], [System.AreaPath], [System.IterationPath], 
	[Microsoft.VSTS.Common.Priority] 
		
FROM WorkItems 

WHERE 
	[System.TeamProject] = @project  
	AND  [System.AssignedTo] = @me  
	AND  [System.WorkItemType] = 'Task'  
	AND  [System.State] <> 'Done'  
	AND  [System.State] <> 'Removed' 

ORDER BY [System.State], [System.ChangedDate] desc 
`;