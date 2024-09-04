import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>
              <div className="h-6 w-3/4 bg-green-400 dark:bg-green-800 rounded animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <div
                key={j}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
