"use client";

import { DataTable } from "@/components/shared/data-table";
import { useState } from "react";
import { getColumns } from "@/components/shared/columns";
import { MemberType } from "@/types/member";
import { useToast } from "@/hooks/use-toast";
import { getCookie } from "cookies-next";
import axios from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GroupType } from "@/types/Group";

type Props = {
  data: MemberType[];
  schoolId: string;
  group: GroupType;
};

export default function GroupMembersTable({ group, schoolId, data }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);

  async function handleAssign() {
    const token = await getCookie("token");

    await axios
      .post(
        `/school/${schoolId}/group/${group.id}/member`,
        { userIds: selectedMemberIds },
        {
          headers: { Authorization: token },
        },
      )
      .then(() => {
        router.refresh();
        toast({
          title: "Success",
          description: `Member(s) have been successfully assigned to ${group.name}.`,
        });
      })
      .catch((err: AxiosError) => {
        toast({
          title: "Error",
          description:
            (err.response?.data as string) ||
            `Failed to assign member(s) to ${group.name}. Please try again.`,
          variant: "destructive",
        });
      });
  }

  async function handleUnassign() {
    const token = await getCookie("token");

    await axios
      .delete(`/school/${schoolId}/group/${group.id}/member`, {
        headers: { Authorization: token },
        data: { userIds: selectedMemberIds },
      })
      .then(() => {
        router.refresh();
        toast({
          title: "Success",
          description: `Member(s) have been successfully unassigned to ${group.name}.`,
        });
      })
      .catch((err: AxiosError) => {
        toast({
          title: "Error",
          description:
            (err.response?.data as string) ||
            `Failed to unassign member(s) to ${group.name}. Please try again.`,
          variant: "destructive",
        });
      });
  }

  return (
    <DataTable
      setSelectedMemberIds={setSelectedMemberIds}
      columns={getColumns(schoolId)}
      data={data}
      defaultFilteredGroupIds={[group.id]}
      schoolId={schoolId}
    >
      <>
        <Button
          onClick={handleAssign}
          size="sm"
          className="bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary border-none"
          disabled={selectedMemberIds.length == 0}
        >
          Assign
        </Button>
        <Button
          size="sm"
          onClick={handleUnassign}
          disabled={selectedMemberIds.length == 0}
          className="bg-destructive/10 text-destructive hover:bg-destructive/15 hover:text-destructive border-none"
        >
          Unassign
        </Button>
      </>
    </DataTable>
  );
}
