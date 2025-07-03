"use client"

import React, { useState } from "react"
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock"
import { IconRotate } from "@tabler/icons-react";
import { Button } from "@/components/ui/Btn";

export const ComponentShowcase = ({ component, code, showRefresh }: { component: React.ReactNode, code: string, showRefresh?: boolean } = { showRefresh: false, component: <></>, code: "" }) => {
  const [isCode, setIsCode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div
            className={`cursor-pointer border-b transition-colors ${isCode ? "text-muted-foreground" : "text-primary border-b-primary"}`}
            onClick={() => setIsCode(false)}
          >
            Preview
          </div>
          <div
            className={`cursor-pointer border-b transition-colors ${isCode ? "text-primary border-b-primary" : "text-muted-foreground"}`}
            onClick={() => setIsCode(true)}
          >
            Code
          </div>
        </div>
        {
          showRefresh && !isCode && (
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={() => setRefreshKey(k => k + 1)}
            >
              <IconRotate size={18} />
            </Button>
          )
        }
      </div>

      {isCode ? (
        <CodeBlock lang="tsx" keepBackground className="max-h-[25rem] overflow-auto">
          <Pre className="px-6 font-mono">
            {code}
          </Pre>
        </CodeBlock>
      ) : (
        <div key={refreshKey} className="h-[25rem] w-full rounded-xl border border-border p-4 flex flex-col justify-center items-center">
          {component}
        </div>
      )}
    </div>
  )
}