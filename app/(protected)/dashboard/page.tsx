'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

const standards = [
  { name: 'CDM', value: 0, projects: 0 },
  { name: 'VCS', value: 36000, projects: 2, now: 30000, future: 6000 },
  { name: 'GS', value: 1600000, projects: 2 },
  { name: 'CERCARBONO', value: 0, projects: 0 },
  { name: 'I-RECS', value: 0, projects: 0 },
  { name: 'CSA', value: 0, projects: 0 },
  { name: 'PLAN VIVO', value: 0, projects: 0 },
  { name: 'CAR', value: 0, projects: 0 },
  { name: 'BIO CARBON', value: 0, projects: 0 }
]

type MoreInfoProps = {
  standard: {
    now?: number
    future?: number
  }
}
const MoreInfo = ({ standard }: MoreInfoProps) => {
  return (
    <div className="mt-4 bg-green-100 dark:bg-green-900 p-2 rounded">
      {standard.now && standard.future ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-semibold">Availability</p>
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-row items-center gap-2">
              <p className="text-lg">Now</p>
              <p className="text-lg font-bold">
                {standard.now.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-lg">Future</p>
              <p className="text-lg font-bold">
                {standard.future.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm">No additional information available.</p>
      )}
    </div>
  )
}

export function StandardsOverview() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  )

  const toggleExpand = (name: string) => {
    setExpandedCards((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        AVAILABLE BY STANDARD
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {standards.map((standard) => (
          <Card key={standard.name} className="overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
              <CardTitle className="flex justify-between items-center">
                {standard.name}
                <Link
                  href={`/inventory?standard=${standard.name.toLowerCase()}`}
                  passHref
                  legacyBehavior
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-green-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <p className="text-3xl font-bold">
                {standard.value.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                belonging to {standard.projects} projects.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-sm font-semibold">Own</p>
                  <p>{standard.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">MKT Agreement</p>
                  <p>0</p>
                </div>
              </div>
              <Button
                variant="link"
                className="mt-2 p-0 h-auto text-green-600 hover:text-green-700"
                onClick={() => toggleExpand(standard.name)}
                icon="ChevronRight"
              >
                {expandedCards[standard.name] ? 'See Less' : 'See More'}
              </Button>
              {expandedCards[standard.name] && <MoreInfo standard={standard} />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ProjectDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">TD PROJECTS</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-green-100 dark:bg-green-700">
          <CardHeader>
            <CardTitle className="text-lg">COMPLETE</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              belonging to 0 projects.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-100 dark:bg-green-700">
          <CardHeader>
            <CardTitle className="text-lg">ONGOING</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">800.000</p>
            <p className="text-sm text-muted-foreground">
              belonging to 1 projects.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-100 dark:bg-green-700">
          <CardHeader>
            <CardTitle className="text-lg">FORECASTED</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              belonging to 0 projects.
            </p>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-bold mb-4">ONGOING STAGE</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              STAGE 1-ELABORATION OF DOCUMENTATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">800.000</p>
            <p className="text-sm text-muted-foreground">
              belonging to 1 projects.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              STAGE 2-VALIDATION/VERIFICATION PROCESS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              belonging to 0 projects.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              STAGE 3-STANDARD ASSESSMENT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              belonging to 0 projects.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">UNDER IMPLEMENTATION</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              belonging to 0 projects.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">FEASIBILITY STUDY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              belonging to 0 projects.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2 mb-6">
        <Alert
          variant="destructive"
          className="dark:bg-red-900 dark:text-white"
        >
          <AlertTriangle className="h-4 w-4 dark:text-white" />
          <AlertDescription>
            You have 1 pending DELIVERIES in less than 2 days.
          </AlertDescription>
        </Alert>
        <Alert
          variant="destructive"
          className="dark:bg-red-900 dark:text-white"
        >
          <AlertTriangle className="h-4 w-4 dark:text-white" />
          <AlertDescription>
            You have 2 pending PAYMENTS in less than 2 days.
          </AlertDescription>
        </Alert>
      </div>

      <h3 className="text-xl font-bold mb-4">OPERATION STATUS</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">DELIVERY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">PAYMENT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">CLOSE OPERATIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">DAILY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              Operations in the last 24 hours.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">WEEKLY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              Operations in the last 7 days.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">MONTHLY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              Operations in the last 30 days.
            </p>
          </CardContent>
        </Card>
      </div>
      <h3 className="text-xl font-bold my-4">CREDITS</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">CREDITS SOLD</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">800.000</p>
            <p className="text-sm text-muted-foreground">In 2 operations.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">CREDITS PURCHASED</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">In 0 operations.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">PENDING DELIVERY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">From 0 operations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <StandardsOverview />
      <ProjectDashboard />
    </div>
  )
}
