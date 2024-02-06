import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <section id="instructions" className="instructions-section">
      <h2 className="section-title">Introduction</h2>
      <p>
        Real-world systems are influenced by many ambiguous circumstances, which complicates planning, modeling, prediction of these systems and decision-making. Therefore, decision-making procedures often rely on the opinions of experts who express their standpoints from their own perspective. Depending on the structure of expert teams, experts’ opinions can vary broadly or may even contradict. Finding the best possible compromise of experts’ opinions is a basic need in such situations. Over many years of research at Czech University of Life Sciences in Prague (ČZU), we have developed the unique BeCoMe (Best-Compromise-Mean) method for determining the optimum group decision, which corresponds to the best compromise/agreement of all experts’ opinions. The optimum decision is a result of a computationally complex fuzzy set mathematical model based on minimizing entropy.
      </p>
      <p>
        The submitted tool based on the optimum BeCoMe method is a unique, helpful and easily available instrument in many decision-making situations, such as for decisions related to state security, public health, investments, flood prevention, energetic self-sufficiency, or IT contracts.
      </p>

      <h2 className="section-title">How Do Experts Express Their Standpoint?</h2>
      <p>
        Experts answer the raised question and assess a certain quantitative parameter of the proposed solution (such as the number of days of quarantine, sales time, or percentage of arable land changed to a polder).
      </p>
      <p>
        Experts can express their responses in three ways:
      </p>
      <ol className="instructions-list">
        <li>a) Crisp number;</li>
        <li>b) Fuzzy number/interval with a triangular membership function represented by a triple: best proposal, lower limit, and upper limit; or</li>
        <li>c) Likert linguistic term: Strongly disagree, Rather disagree, Neutral, Rather agree, Strongly agree.</li>
      </ol>
      <p>
        Information on each expert’s response is inserted into the orange cells named Expert role/name and Expert proposal.
      </p>
      <p>
        Please clear the columns Best proposal, Lower limit, and Upper limit before inserting data!
      </p>
      <p>
        Detailed instructions for inserting data are included in the headers of the sheets “Interval tool” (for data expressed as a number of fuzzy intervals) and “Likert tool” (for data expressed as a Likert linguistic term).
      </p>

      <h2 className="section-title">Results:</h2>
      <ol className="instructions-list">
        <li>The best compromise</li>
        <li>The maximum error of estimate</li>
      </ol>
    </section>
  );
};

export default Instructions;
