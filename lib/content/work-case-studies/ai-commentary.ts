import type { CaseStudy } from "@/types/case-study";

export const aiCommentaryCaseStudy: CaseStudy = {
  slug: "ai-commentary",
  experimentId: "ai-commentary",
  title: "Designing a real-time AI experience that increased free trial starts by 162%",
  subtitle: "AI prediction · Live sports · Monetisation",
  lede: `RushLine is an AI-first sports analytics platform reimagining how fans follow live cricket. This case study explores the journey of redesigning the live match experience to increase engagement, strengthen monetization, and make AI-powered insights an indispensable part of every match.

The vision was to build India's most trusted sports prediction and analytics platform by transforming the second-screen experience from passive score tracking into an interactive, insight-driven companion.`,
  objective: `Design an engaging live-match experience that seamlessly fits into users' existing match-following habits, clearly communicates the value of AI-powered sports intelligence, and drives long-term engagement and monetization.`,
  summaryCards: [
    {
      type: "challenge",
      title: "Challenge",
      body: "We validated multiple monetization models—from pay-per-match to subscriptions—but users converted without returning. Research revealed the issue wasn't pricing or onboarding friction. **Users struggled to understand the value of AI-powered insights and defaulted to existing match-following habits.**",
    },
    {
      type: "breakthrough",
      title: "Breakthrough",
      body: "**A failed free-trial experiment changed our thinking.** Removing the card requirement increased low-intent users instead of engagement. The real challenge wasn't convincing users to pay—it was **becoming part of their existing match-following journey.** This insight reframed the entire product strategy.",
    },
    {
      type: "outcome",
      title: "Outcome",
      body: "I redesigned the live match experience around habit, context, and emotional engagement, transforming AI predictions from a standalone feature into a second-screen companion. **The redesign led to 162% more free-trial starts, 5× higher time spent, 2× feature adoption, and D7 retention improving from 32.6% to 51.8%.**",
    },
  ],
  categories: ["AI Prediction", "Monetisation", "Sports"],
  heroImage: {
    src: "/Work/Images/Cover.png",
    width: 1850,
    height: 1200,
    alt: "iPhone mockup frame for AI commentary case study hero",
  },
  heroVideoOverlay: {
    frameImage: {
      src: "/Work/Images/Cover.png",
      width: 1850,
      height: 1200,
      alt: "iPhone mockup frame for AI commentary case study hero",
    },
    videoSrc: "/Work/Videos/AI%20commentary%20video.mp4",
    videoAlt: "AI commentary app walkthrough playing inside iPhone mockup",
    videoTopCropPercent: 6.2,
    desktopViewport: {
      top: 17.72,
      left: 34.57,
      width: 30.95,
      height: 82.28,
      borderRadius: 6.8,
    },
    mobileViewport: {
      top: 17.72,
      left: 34.57,
      width: 30.95,
      height: 82.28,
      borderRadius: 6.8,
    },
  },
  meta: {
    duration: "8 weeks",
    status: "Shipped",
    role: [
      "Lead product designer",
      "UX research",
      "Interaction design",
      "Visual design",
      "Design QA",
    ],
    team: [
      "1 PM",
      "2 ML engineers",
      "3 Android/iOS engineers",
      "1 Data analyst",
    ],
    tools: ["Figma", "Maze", "Amplitude", "Principle"],
    impact: `↑162% — Free Trial Starts
    ↑2× — Feature Adoption
↑5× — Average Time Spent
51.8% — D7 Retention`,
  },
  relatedSlugs: [],
  sections: [
    {
      id: "problem",
      eyebrow: "Problem",
      title: "The Challenge",
      paragraphs: [
        `When I joined RushLine (formerly CriQ), the team was validating whether users would pay for sports intelligence.`,
        `The team experimented with multiple monetization strategies, beginning with paid match predictions that generated ₹10,000 in the first week.`,
        `Although early traction looked promising, growth wasn't sustainable.`,
        `We tested:`,
      ],
      bullets: ["Pay-per-match", "Tour packages", "Subscription plans"],
      closingParagraphs: [
        `Each experiment improved conversion slightly, but retention remained low. The product wasn't failing because users refused to pay. Something deeper was happening.`,
      ],
    },
    {
      id: "research",
      eyebrow: "Research",
      title: "User Feedback",
      researchStats: [
        { label: "Interview: 30 min", value: "32 Calls" },
        { label: "Interview: 30 min", value: "5 In-person" },
        { label: "Form: 5 min to finish", value: "160 Surveys" },
      ],
      paragraphs: [
        `We conducted user interviews, analyzed behavioural data, and studied conversion funnels.`,`One insight appeared repeatedly.`,
      ],
      researchGallery: {
        items: [
          {
            type: "image",
            src: "/Work/research/field-free-trial.jpg",
            width: 768,
            height: 1024,
            alt: "Participant holding a phone showing the Rushline free trial offer during user research",
          },
          {
            type: "image",
            src: "/Work/research/bento-criq-trending.png",
            width: 624,
            height: 622,
            alt: "CRIQ+ AI cricket chat interface with live scores and trending questions",
            fit: "cover",
            objectPosition: "top",
            unoptimized: true,
          },
          {
            type: "video",
            src: "/Work/research/coachmark-journey.mov",
            alt: "Screen recording of the Rushline coachmark onboarding journey",
            controls: false,
            autoPlay: true,
            muted: true,
            loop: true,
            videoScale: 1.1,
          },
          {
            type: "image",
            src: "/Work/research/field-interview.jpg",
            width: 682,
            height: 1024,
            alt: "Participant holding a phone showing the Asia Cup tour pass subscription screen during user research",
          },
        ],
        feedbackClips: [
          {
            name: "Chinmay, casual fan",
            quote:
              "I don't want to pay before I know it's worth it.",
          },
          {
            name: "Priya, IPL follower",
            quote:
              "I will think about spending money only after they trust the predictions.",
          },
          {
            name: "Arjun, fantasy player",
            quote:
              "I get confused during live matches; I go to Cricbuzz to check toss, pitch, and weather.",
          },
          {
            name: "Tushar, subscriber",
            quote:
              "Manually switching between score apps and prediction tabs kills the flow.",
          },
          {
            name: "Rohan, trial user",
            quote:
              "AI predictions feel random until I see them hit a few times in a row.",
          },
          {
            name: "Sourab, power user",
            quote:
              "Critical changes like wickets and boundaries need to be notified instantly.",
          },
          {
            name: "Dev, churned user",
            quote:
              "If it doesn't tell me why the prediction matters, I ignore it completely.",
          },
        ],
      },
      closingParagraphs: [
        `!!Users weren't rejecting the product. They simply couldn't understand its value quickly enough.`,
      ],
    },
    {
      id: "experiment",
      eyebrow: "Experiment",
      title: "The Experiment That Changed Our Direction",
      paragraphs: [`We removed card requirements for free trials.`],
      calloutPlacement: "afterParagraphs",
      callouts: [
        {
          type: "decision",
          title: "Expectation",
          body: "Less friction = more conversions.",
        },
      ],
      continuedParagraphs: [
        `Reality:\n\nConversions barely improved.`,
        `Instead we discovered:`,
      ],
      bullets: [
        `Removing the card attracted low-intent users.`,
        `Users who added cards were already more committed.`,
        `Friction wasn't the problem.`,
      ],
      closingParagraphs: [
        `Perceived value was.`,
        `>>This is a beautiful turning point.`,
      ],
    },
    {
      id: "goals",
      eyebrow: "Goals",
      title: "Defining success before pixels",
      paragraphs: [
        "We aligned on three product goals and measurable outcomes before moving into design:",
      ],
      bullets: [
        "Increase free trial starts by giving users a taste of premium AI insights during live matches",
        "Improve session depth—time spent and screens viewed per live match",
        "Build trust in AI-generated commentary so users would return match after match",
      ],
      callouts: [
        {
          type: "impact",
          title: "Success metrics",
          body: [
            "Primary: Free trial conversion rate during live matches",
            "Secondary: Avg. session duration on match centre",
            "Guardrail: Commentary dismiss rate & negative feedback",
            "Qualitative: Trust score in post-match surveys",
          ],
        },
      ],
    },
    {
      id: "process-flows",
      eyebrow: "Design process",
      title: "From flows to high-fidelity",
      paragraphs: [
        "I mapped the end-to-end journey: match entry → commentary surfacing → engagement → trial conversion. Three interaction patterns emerged and were tested in low-fidelity prototypes.",
      ],
      timeline: [
        {
          date: "Week 1–2",
          title: "Discovery & audit",
          description:
            "Stakeholder interviews, analytics review, competitive teardown, and research synthesis.",
        },
        {
          date: "Week 3–4",
          title: "Flows & wireframes",
          description:
            "User flows for live/paused states, notification triggers, and paywall moments. Tested with 8 users.",
        },
        {
          date: "Week 5–8",
          title: "Visual design & iteration",
          description:
            "High-fidelity UI, motion specs, and three rounds of engineering feasibility review.",
        },
        {
          date: "Week 9–12",
          title: "Ship & measure",
          description:
            "Phased rollout, A/B on paywall timing, post-launch iteration on commentary density.",
        },
      ],
      mediaGrid: {
        columns: 2,
        items: [
          {
            type: "image",
            src: "/Work/base/ai-commentary.webp",
            width: 1850,
            height: 1200,
            fit: "contain",
            alt: "Early wireframe showing commentary card placement on the live match screen",
            caption: "Early wireframes — commentary placement on match centre",
          },
          {
            type: "image",
            src: "/Work/frames/ai-commentary.png",
            width: 1850,
            height: 1200,
            fit: "contain",
            alt: "Annotated frame showing commentary card states and interaction zones",
            caption: "Annotated frames — card states and tap targets",
          },
        ],
      },
    },
    {
      id: "iterations",
      eyebrow: "Iterations",
      title: "Key design decisions",
      paragraphs: [
        "Several early directions didn't survive contact with users or engineering constraints:",
      ],
      callouts: [
        {
          type: "decision",
          title: "Card over chat",
          body: "We explored a chat-style AI interface but users found it distracting during live play. Discrete commentary cards with clear dismiss won in testing.",
        },
        {
          type: "hiccup",
          title: "The trust problem",
          body: "First prototypes showed raw ML confidence scores. Users called them 'random numbers.' We replaced percentages with narrative predictions backed by visible signals (form, matchup, conditions).",
        },
        {
          type: "learning",
          title: "Timing beats volume",
          body: "More commentary didn't mean better engagement. Capping at one insight per over—with smart triggers at wickets and milestones—increased read-through rate by 34%.",
        },
      ],
    },
    {
      id: "pre-live-story",
      eyebrow: "Pre-live story",
      media: [
        {
          type: "image",
          src: "/Work/Images/Pre%20live%20story.webp",
          width: 3700,
          height: 2572,
          fit: "contain",
          unoptimized: true,
          alt: "Pre-live experience across three phone screens: playing XI, AI match preview, and pitch report",
          caption: "Pre-live story — playing XI, AI match preview, and pitch report before the match",
        },
      ],
    },
    {
      id: "solution",
      eyebrow: "Final solution",
      title: "Commentary that earns attention",
      paragraphs: [
        "The final experience layers AI commentary into the live match centre without competing with the scorecard. Each card follows a consistent structure: headline prediction, one-line rationale, and optional expand for deeper analysis.",
        "A subtle warm gradient behind cards ties the feature to the premium tier without breaking the app's neutral palette. Motion is restrained—cards slide in from the bottom with a gentle fade, respecting the urgency of live sport.",
      ],
      beforeAfter: {
        beforeImage: "/Work/Images/Before.webp",
        afterImage: "/Work/Images/After.webp",
        beforeLabel: "Before",
        afterLabel: "After",
      },
      media: [
        {
          type: "image",
          src: "/Work/Images/Match%20states.webp",
          width: 3700,
          height: 1800,
          fit: "contain",
          alt: "Pre-live, live, and post-match states of the AI commentary experience shown across three phone screens",
          caption: "Match states — pre-live, live, and post-match commentary experience",
        },
      ],
    },
    {
      id: "solution-detail",
      eyebrow: "Solution detail",
      title: "Editorial layout across breakpoints",
      variant: "immersive",
      paragraphs: [
        "On tablet and desktop web, commentary expands into a side panel that syncs with the live scorecard. The editorial grid keeps visuals large and readable—never scaled-down mobile screenshots on a wide canvas.",
      ],
      mediaGrid: {
        columns: 1,
        items: [
          {
            type: "image",
            src: "/Work/previews/ai-commentary.png",
            width: 1850,
            height: 1200,
            fit: "contain",
            alt: "Responsive layout showing AI commentary across mobile and tablet breakpoints",
            caption: "Responsive layouts — mobile-first with thoughtful tablet adaptation",
          },
        ],
      },
    },
    {
      id: "outcomes",
      eyebrow: "Outcomes",
      title: "Impact that moved the business",
      paragraphs: [
        "The feature launched to 100% of users during international matches. Results exceeded targets within the first month:",
      ],
      bullets: [
        "162% increase in free trial starts during live matches",
        "28% lift in average session duration on match centre",
        "4.2★ average rating on in-app feedback for AI commentary",
        "Dismiss rate below 12%—users engaged rather than ignored cards",
      ],
      callouts: [
        {
          type: "impact",
          title: "The monetisation flywheel worked",
          body: "Free users received 3 AI insights per innings. When they hit the limit at a high-tension moment—often a wicket or final over—conversion spiked. Timing the paywall to emotional peaks, not arbitrary counts, was the breakthrough.",
        },
      ],
    },
    {
      id: "learnings",
      eyebrow: "Key learnings",
      title: "Reflections",
      paragraphs: [
        "This project reinforced that AI product design is as much about pacing and trust as it is about model quality.",
      ],
      bullets: [
        "Narrative beats numbers — users engage with stories, not confidence intervals",
        "Preview the premium experience during peak emotion, not at onboarding",
        "Design for interruption — live sport is chaotic; UI must be glanceable",
        "Cross-functional alignment early prevents costly pivots late in the cycle",
      ],
      postCalloutParagraphs: [
        "!!AI features don't succeed on intelligence alone. They succeed when the experience feels human, timely, and worth coming back to.",
      ],
    },
  ],
};
