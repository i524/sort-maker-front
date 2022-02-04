/**
 * # 実装方針について
 *
 * ## 依存関係について
 * アプリケーションにとって重要なロジックはそれ単体で変更可能になっていることが望ましい.
 * ふつうに vuex のアプリケーションを作る上では依存の方向性は以下のようになる:
 * view -> vuex module -> sort algorithm
 * このパターンでは, 原理的にはソートのアルゴリズムの変更が view に影響を及ぼす可能性があり, 変更コストが高くなるリスクがある.
 * 以下のようにできると良い(依存性逆転の原則):
 * view -> vuex module -> sort interface <- sort algorithm
 * 良い interface を定義できれば, sort algorithm と vuex module はそれぞれ他方に影響を及ぼすことなく変更できる.
 * JavaScript では言語仕様上 interface のようなものは定義できないため, 「そういうものがあるつもりで」実装する.
 * また, 厳密な依存性逆転のためには依存性の注入(Dependency Injection)がセットで必要になるが, 今回はそこまではやらない.
 * ただし, 後でやりたくなった時にできるようにしておくのが理想.
 *
 * ## デザインパターンについて
 * このアプリケーションでは, ソートのアルゴリズムはひとつに固定する必要がない.
 * 例えば, 実際にやるかは別として, ユーザがアルゴリズムを選択できるようにしても良い.
 * 全体の処理としては変わらず, 内部のアルゴリズムだけが変更できる場合の実装パターンとしては Strategy パターンが使える.
 * よく知られたパターンに従って命名することはコードを読む人へのわかりやすさにもつながるので, Strategy という名前を使う.
 */

const initialState = {
  /**
   * ユーザがソートしようとしている元の配列
   */
  array: [],
  /**
   * ソートした結果の配列
   * ソートが完了するまでは空かもしれない
   */
  result: [],
  /**
   * ソートの進行状況(アルゴリズム上必要なもの)
   * 何が入るかわからないので状態管理の方法としてはイマイチかもしれないです
   */
  sortingState: {},
}

/**
 * 挿入ソートで実装してみていますが, 内容は何でも良いです.
 * アルゴリズムによらないインターフェースを提供することが目的です.
 */
export class SortStrategy { // テスト用に export
  static _initialInsertionIndex = 1
  static getNextCandidates(state) {
    console.log(state.result, state.result[0])
    return [
      state.result[state.sortingState.scanIndex || 0],
      this._insertCandidate(state),
    ]
  }
  static applyCompareResult(state, selectedItem) {
    if (selectedItem.id === this._insertCandidate(state).id) {
      const result = [...state.result]
      result.splice(state.scanIndex, 0, this._insertCandidate(state))
      console.log(this._insertCandidate(state))
      return {
        ...state,
        result,
        isDone: result.length === state.array.length,
        sortingState: {
          ...state.sortingState,
          insertIndex: (state.sortingState.insertIndex || 1) + 1,
          scanIndex: 0,
        }
      }
    } else if (state.sortingState.scanIndex === state.result.length - 1) {
      const result = [...state.result]
      result.push(this._insertCandidate(state))
      return {
        ...state,
        result,
        isDone: result.length === state.array.length,
        sortingState: {
          ...state.sortingState,
          insertIndex: (state.sortingState.insertIndex || 1) + 1,
          scanIndex: 0,
        }
      }
    } else {
      return {
        ...state,
        sortingState: {
          ...state.sortingState,
          scanIndex: (state.sortingState.scanIndex || 0) + 1,
        }
      }
    }
  }
  static _insertCandidate(state) {
    return state.array[state.sortingState.insertIndex || 1]
  }
}

const getters = {
  isDone(state) {
    return state.array.length === state.result.length
  },
  nextCandidates(state) {
    return SortStrategy.getNextCandidates(state)
  },
  result(state) {
    return state.result
  }
}

const mutations = {
  setArray(state, { array }) {
    if (array.length === 0) {
      return {
        ...initialState,
      }
    }
    return {
      ...initialState,
      array,
      result: [array[0]]
    }
  },
  prefer(state, { item }) {
    return SortStrategy.applyCompareResult({ state, item })
  }
}

const sorting = {
  state: { ...initialState },
  getters,
  mutations,
}

export default sorting
