import sorting from './sorting'
import { SortStrategy } from './sorting'

describe('sorting', () => {
  describe('strategy', () => {
    it('ソートできる', () => {
      let state = {
        array: [{id: 1}, {id: 2}, {id: 3}, {id: 4}],
        result: [{ id: 1 }],
        sortingState: {},
      }
      while (state.array.length !== state.result.length) {
        const [a, b] = SortStrategy.getNextCandidates(state)
        const selected = a.id > b.id ? a : b // 常に id が大きい方を選んでみる
        state = SortStrategy.applyCompareResult(state, selected)
      }
      expect(state.result).toEqual([{id: 4}, {id: 3}, {id: 2}, {id: 1}])
    })
  })
})
