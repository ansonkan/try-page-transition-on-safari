import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export interface QueryContextProps {
    children: React.ReactNode
}

export const QueryContext = ({ children }: QueryContextProps) => {
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}