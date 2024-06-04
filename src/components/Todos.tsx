import { useStore } from '@nanostores/react'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { queryClient } from '../stores/query-store'

type Todo = {
    id: number | string
    title: string
}

const todos: Todo[] = []

const getTodos = () => {
    return todos
}

const postTodo = (newTodo: Todo) => {
    return new Promise((resolve) => {
        todos.push(newTodo)
        setTimeout(() => resolve(newTodo), 2000)

    })
}

export function Todos() {
    const $queryClient = useStore(queryClient)

    return (
        <QueryClientProvider client={$queryClient}>
            <InnerTodos />
        </QueryClientProvider>
    )
}


function InnerTodos() {
    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

    // Mutations
    const mutation = useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    return (
        <div>
            <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

            <button
                onClick={() => {
                    mutation.mutate({
                        id: Date.now(),
                        title: 'Do Laundry',
                    })
                }}
            >
                Add Todo
            </button>
        </div>

    )
}