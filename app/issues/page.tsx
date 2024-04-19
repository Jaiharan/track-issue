"use client"

import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import IssuePageComponent from "../components/IssuePage";

const IssuePage = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <IssuePageComponent />
    </div>
  );
};

export default IssuePage;
