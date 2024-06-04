import React, { useState } from 'react';
import { useStore } from '@nanostores/react'
import './Counter.css';
import { count } from '../../stores/counter-store';

export interface CounterProps {
    children: React.ReactNode

}

export function Counter({ children }: CounterProps) {
    const $count = useStore(count)

    return (
        <>
            <div className="counter">
                <button onClick={() => count.set($count - 1)}>-</button>
                <pre>{$count}</pre>
                <button onClick={() => count.set($count + 1)}>+</button>
            </div>
            <div className="counter-message">{children}</div>
        </>
    );
}
