"use client";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data} = useGetWorkspaces({id: workspaceId})
  console.log(data)
  return <>ID: {workspaceId} {JSON.stringify(data)}</>;
};

export default WorkspaceIdPage;
