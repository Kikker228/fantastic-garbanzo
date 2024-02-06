class BeCoMe {
  constructor(expertJudgments) {
    this.expertJudgments = expertJudgments;
  }

  calculateArithmeticMean() {
    const verticesSum = this.expertJudgments.reduce(
      (sum, judgment) => sum.map((value, i) => value + judgment[i]),
      Array(this.expertJudgments[0].length).fill(0)
    );

    return verticesSum.map((value) => value / this.expertJudgments.length);
  }

  calculateCentroids() {
    return this.expertJudgments.map((judgment) =>
      judgment.reduce((sum, vertex) => {
        if (Array.isArray(vertex)) {
          return sum.map((value, i) => value + vertex[i]);
        } else {
          return sum.map((value, i) => value + vertex);
        }
      }, Array(this.expertJudgments[0].length).fill(0))
    ).map((vertexSum, index) => {
      const count = this.expertJudgments[index].length;
      return vertexSum.map((value) => (count > 0) ? value / count : NaN);
    });
  }

  rankExperts(centroids) {
    const sortedIndices = centroids
      .map((value, index) => ({ value, index }))
      .sort((a, b) => a.value - b.value)
      .map((item) => item.index);

    return sortedIndices.map((index, rank) => ({ index, rank }));
  }

  calculateMedian(rankedList) {
    const middleIndex = Math.floor(rankedList.length / 2);
    const medianIndex = (rankedList.length % 2 === 0) ? middleIndex : middleIndex;
    const median = this.expertJudgments[rankedList[medianIndex].index];

    return median;
  }

  calculateBecome() {
    if (this.expertJudgments.length === 0 || this.expertJudgments[0].length === 0) {
      console.error('Invalid input data.');
      return {
        become: Array(this.expertJudgments[0].length).fill(NaN),
        maxError: NaN,
      };
    }

    const arithmeticMean = this.calculateArithmeticMean();
    const centroids = this.calculateCentroids();

    console.log('arithmeticMean:', arithmeticMean);
    console.log('centroids:', centroids);

    if (isNaN(arithmeticMean[0]) || centroids.some(vertex => isNaN(vertex[0]))) {
      console.error('Invalid arithmetic mean or centroid values.');
      return {
        become: Array(this.expertJudgments[0].length).fill(NaN),
        maxError: NaN,
      };
    }

    const rankedList = this.rankExperts(centroids);
    const median = this.calculateMedian(rankedList);

    console.log('median:', median);

    if (isNaN(median[0])) {
      console.error('Invalid median values.');
      return {
        become: Array(this.expertJudgments[0].length).fill(NaN),
        maxError: NaN,
      };
    }

    const become = arithmeticMean.map((value, i) => (value + median[i]) / 2);

    return {
      become,
      maxError: Math.abs(arithmeticMean[0] - median[0]) / 2,
    };
  }
}

module.exports = BeCoMe;