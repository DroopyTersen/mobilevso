module.exports = `
SELECT 
	[System.Id], [System.NodeName], [System.Title], 
	[Microsoft.VSTS.Scheduling.RemainingWork], [System.State], 
	[System.IterationPath], [Microsoft.VSTS.Common.Priority] 

FROM WorkItemLinks 

WHERE 
	(
		Source.[System.TeamProject] = @project 
		AND Source.[System.State] <> 'Done' 
		AND Source.[System.State] <> 'Removed'
	) 
	AND 
	(
		[System.Links.LinkType] = 'System.LinkTypes.Hierarchy-Forward'
	) 
	AND 
	(
		Target.[System.TeamProject] = @project 
		AND Target.[System.WorkItemType] = 'Task' 
		AND Target.[System.AssignedTo] = @me 
		AND Target.[System.State] = 'Done' 
		AND Target.[Microsoft.VSTS.Common.ClosedDate] > @today - 10
	) 

ORDER BY [Microsoft.VSTS.Common.ClosedDate] desc mode(Recursive,ReturnMatchingChildren)
`;