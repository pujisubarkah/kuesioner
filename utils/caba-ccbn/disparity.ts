/**
 * CABA-CCBN Module: Contextual Disparity (Equation 7)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

/**
 * Eq. (7): Contextual Disparity
 * D_t = disparity(d_{i,t} | context/group)
 * GROUP-LEVEL disparity metric measuring the gap across different context partitions.
 * (3T vs Urban is one illustrative example of context group partitioning).
 */
export function computeDisparity(groupAOutcome: number, groupBOutcome: number): number {
  const gap = Math.abs(groupAOutcome - groupBOutcome);
  return Math.round(gap * 100) / 100;
}
