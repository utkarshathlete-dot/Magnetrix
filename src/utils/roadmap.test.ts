import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTimelineProgress,
  getNextRoadmapIndex,
  getPrevRoadmapIndex,
  ROADMAP_STAGES,
} from './roadmap.ts';

test('calculateTimelineProgress calculates accurate percentage between 0 and 100', () => {
  assert.equal(calculateTimelineProgress(0, 4), 0);
  assert.equal(calculateTimelineProgress(1, 4), 33);
  assert.equal(calculateTimelineProgress(2, 4), 67);
  assert.equal(calculateTimelineProgress(3, 4), 100);
  assert.equal(calculateTimelineProgress(5, 4), 100);
});

test('getNextRoadmapIndex and getPrevRoadmapIndex cycle correctly', () => {
  assert.equal(getNextRoadmapIndex(0, 4), 1);
  assert.equal(getNextRoadmapIndex(3, 4), 0);
  assert.equal(getPrevRoadmapIndex(0, 4), 3);
  assert.equal(getPrevRoadmapIndex(2, 4), 1);
});

test('ROADMAP_STAGES has 4 sequential phases', () => {
  assert.equal(ROADMAP_STAGES.length, 4);
  assert.equal(ROADMAP_STAGES[0].stepNumber, '01');
  assert.equal(ROADMAP_STAGES[3].stepNumber, '04');
});
