module.exports = (displayName) => {
	return  `
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
		AND  
		(
			Target.[System.WorkItemType] = 'Task' 
			OR
			Target.[System.WorkItemType] = 'Bug' 
		)
		AND Target.[System.AssignedTo] = '${displayName}' 
		AND Target.[System.State] <> 'Done' 
		AND Target.[System.State] <> 'Removed'
	)

ORDER BY [Microsoft.VSTS.Common.Priority], [System.State] mode(Recursive,ReturnMatchingChildren)
`;
}