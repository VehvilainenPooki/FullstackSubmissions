import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  test('reset Resets the state', () => {
    var action = {
      type: 'GOOD'
    }
    const state = initialState
    deepFreeze(state)
    const newState1 = counterReducer(state, action)

    action = {
      type: 'OK'
    }
    deepFreeze(newState1)
    const newState2 = counterReducer(newState1, action)

    action = {
      type: 'BAD'
    }
    deepFreeze(newState2)
    const newState3 = counterReducer(newState2, action)
    expect(newState3).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })

    action = {
      type: 'RESET'
    }
    deepFreeze(newState3)
    const newState4 = counterReducer(newState3, action)
    expect(newState4).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
