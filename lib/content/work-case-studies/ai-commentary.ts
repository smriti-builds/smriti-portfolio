import type { CaseStudy } from "@/types/case-study";

export const aiCommentaryCaseStudy: CaseStudy = {
  slug: "ai-commentary",
  experimentId: "ai-commentary",
  title: "Designing a real-time AI experience that increased free trial starts by 162%",
  subtitle: "AI prediction · Live sports · Monetisation",
  lede: `RushLine is an AI-first sports analytics platform reimagining how fans follow live cricket. The vision was to build India's most trusted sports prediction and analytics platform by transforming the second-screen experience from passive score tracking into an interactive, insight-driven companion.

!!This project represents a strategic pivot for a 0→1 sports analytics product.

The challenge wasn't a lack of data, but a perceived value gap. While the AI was generating accurate predictions, users weren't converting from free to paid because the insights lacked context, emotional resonance, and a clear "why."

!!By owning the AI insights layer, fan-biased commentary, and player predictions experience, I helped shift the product from a raw data utility to an emotionally aligned sports companion.

The redesign increased free trial activation by 162% (2.67% → 7%) and doubled sustained DAU versus pre-redesign levels, indicating lasting engagement beyond the initial launch spike.`,
  whyItMattered: `AI Commentary was one of Rushline's key premium features designed to drive paid subscriptions. However, although nearly half of users expressed interest by clicking the free trial, only 4% actually activated it. This meant users weren't experiencing the feature's value during the trial, making activation the biggest bottleneck in the subscription funnel and the highest-impact opportunity for improving paid conversions.`,
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
    role: [],
    team: [
      "1 Product Designer (Me)",
      "1 PM",
      "2 ML engineers",
      "3 Android/iOS engineers",
      "1 Data analyst",
    ],
    tools: ["Figma", "Lottie files", "Mid Journey", "Jitter"],
    impact: `↑162% — Free Trial Starts
↑2× — Feature Adoption
↑5× — Average Time Spent
51.8% — D7 Retention
~87/day — New paid users post redesign`,
  },
  relatedSlugs: [],
  sections: [
    {
      id: "problem",
      eyebrow: "Problem",
      title: "The Challenge",
      paragraphs: [
        `When I joined RushLine (formerly CriQ), the team was validating whether users would pay for sports intelligence.`,
      ],
      hypothesis: {
        title: "Initial Hypothesis",
        body: "If we provide high-quality AI predictions that improve users' fantasy sports decisions, users will be willing to pay for them.",
      },
      continuedParagraphs: [
        `!!To validate this, we focused on rapid experimentation instead of building a polished subscription experience from day one.
        We experimented with multiple monetization strategies, beginning with paid match predictions that generated ₹10,000 in the first week.`,
        `Although early traction looked promising, growth wasn't sustainable.`,
        `We tested:`,
      ],
      bullets: ["Pay-per-match", "Tour packages", "Subscription plans"],
      closingParagraphs: [
        `Each experiment improved conversion slightly, but retention remained low. The product wasn't failing because users refused to pay. Something deeper was happening.`,
      ],
    },
    {
      id: "hypotheses",
      eyebrow: "Hypotheses",
      title: "Validating Willingness to Pay",
      hypotheses: [
        {
          title: "Hypothesis #1",
          body: "Users aren't converting because repeatedly paying for individual matches creates too much friction.",
        },
        {
          title: "Hypothesis #2",
          body: "Reducing signup friction will increase trial adoption and eventually improve paid conversions.",
        },
      ],
      continuedParagraphs: [
        `To test this, we introduced a subscription model and we removed the credit card requirement from the free trial.`,
      ],
      postCalloutParagraphs: [
        `**Result**`,
        `Trial sign-ups increased.`,
        `Paid conversions barely changed.`,
        `**Learning**`,
        `Removing friction attracted more users—but they weren't committed users.`,
        `The credit card requirement had unintentionally acted as a commitment filter.`,
        `The issue wasn't friction. It was intent and perceived value.`,
      ],
      media: [
        {
          type: "image",
          src: "/Work/Images/Experiment.png",
          width: 1024,
          height: 819,
          fit: "contain",
          unoptimized: true,
          alt: "Rushline trial paywall with AI prediction cards shown behind a central mobile screen",
        },
      ],
      funnelMetrics: [
        { label: "Homepage", value: "100%" },
        { label: "Start Trial Clicked", value: "25%" },
        { label: "Free Trial Started", value: "3%" },
        { label: "Paid User", value: "10%" },
      ],
      funnelFollowUp: [
        {
          type: "paragraph",
          text: "**75% drop** in homepage to start trial clicked reasons can be:",
        },
        {
          type: "bullets",
          items: [
            "Users are not understanding the value prop (mainly new users)",
            "Understood the value prop but do not intend to pay (repeat users who have already paid)",
          ],
        },
        { type: "spacer" },
        {
          type: "paragraph",
          text: "**88% drop** in free trial started reasons can be:",
        },
        {
          type: "bullets",
          items: [
            "Lower willingness to provide credit card/auto pay information",
            "Users might not have Google/Apple auto pay set up on their devices",
          ],
        },
        { type: "spacer" },
        {
          type: "paragraph",
          text: "**Out of 507** who started free trial, so far 49 people have paid for subscriptions",
        },
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
      hypothesis: {
        title: "Insight",
        body: "Users weren't looking for commentary—they wanted confidence while making fantasy decisions. Existing commentary described what had happened but rarely helped users decide what to do next.",
      },
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
              "I will think about spending money only after I trust the predictions.",
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
          {
            name: "Krish, Sports investor",
            quote:
              "When I miss a part of the match, I don't want to read long articles to catch up. I just want a quick way to understand what's happened - the excitement fades by the time I've read everything.",
          },
        ],
      },
      closingParagraphs: [
        `!!Users weren't rejecting the product. They simply couldn't understand its value quickly enough.`,
      ],
    },
    {
      id: "wrong-problem",
      eyebrow: "Insight",
      title: "We Were Solving the Wrong Problem",
      paragraphs: [
        `Users also said something even more important through their behaviour.`,
        `Whenever a match started, they instinctively opened Cricbuzz.`,
        `It wasn't because it offered better predictions. In fact, it didn't offer predictions at all`,
        `Because it had become their default habit.`,
        `!!We weren't just competing with another app. We were competing with years of user behaviour.`,
      ],
    },
    {
      id: "user-persona",
      eyebrow: "User persona",
      title: "User Persona",
      media: [
        {
          type: "image",
          src: "/Work/Images/User%20persona.png?v=20260708-0659",
          width: 2480,
          height: 1238,
          fit: "contain",
          unoptimized: true,
          alt: "User persona card summarizing goals, behaviors, and pain points of the primary RushLine user",
        },
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
            "Primary: Free trial activation rate & New paid users",
            "Secondary: Avg. session duration on live commentary tab",
            "Guardrail: Trial cancellation & negative customer feedback",
            "Adoption & Retention: How many users come back after experiencing AI commentary for the first time",
          ],
        },
      ],
    },
    {
      id: "ai-system",
      eyebrow: "Approach",
      title: "Designing for an AI System, not just an Interface",
      paragraphs: [
        ">>AI commentary in sports works by analyzing real-time game data, converting it into natural-sounding commentary, and delivering it through text-to-speech technology. This enables consistent and energetic on-demand sports commentary.",
      ],
      architectureDiagram: {
        ariaLabel:
          "Architecture diagram: Live Match Events flow into Context Engine with Live Score, Player Stats, Match History, and Base Commentary, then AI Commentary Engine, Grounding Validation, Commentary API, and Rushline AI",
        nodes: [
          { label: "Live Match Events" },
          {
            label: "Context Engine",
            detailItems: [
              "Live Score",
              "Player Stats",
              "Match History",
              "Base Commentary",
            ],
          },
          { label: "AI Commentary Engine" },
          { label: "Grounding Validation" },
          { label: "Commentary API" },
          { label: "Rushline AI", emphasis: true },
        ],
      },
      closingParagraphs: [
        "Rather than generating commentary from a prompt alone, the AI was grounded using multiple trusted data sources before the response reached users",
      ],
      callouts: [
        {
          type: "decision",
          hideEyebrow: true,
          title: "AI design principles",
          body: [
            "Ground before generate",
            "Separate prediction from commentary",
            "Context over creativity — rather than maximizing creativity, maximize relevance.",
          ],
        },
      ],
      postCalloutParagraphs: ["##What constraints existed?"],
      postCalloutBullets: [
        "Limited engineering bandwidth",
        "To generate & update AI commentary in real-time during live matches without any lag",
        "Increasing perceived value without increasing cognitive load",
      ],
      fallbackRules: {
        title: "Grounding & hallucination control",
        intro: "What happens if...",
        items: [
          {
            condition: "Kafka event delayed?",
            fallback: "Don't show prediction.",
          },
          {
            condition: "Historical DB unavailable?",
            fallback: "Generate only live commentary.",
          },
          {
            condition: "Prediction confidence below threshold?",
            fallback: "Hide prediction.",
          },
          {
            condition: "Grounding check fails?",
            fallback: "Fallback to SI commentary.",
          },
        ],
      },
    },
    {
      id: "iterations",
      eyebrow: "Iterations",
      title: "Key design decisions",
      paragraphs: [
        `I reframed the problem across three distinct layers to move beyond "UI polish":`,
      ],
      calloutPlacement: "afterParagraphs",
      calloutLayout: "three-column",
      callouts: [
        {
          type: "decision",
          hideEyebrow: true,
          title: "The Trust Layer",
          body: `How might we make AI feel trustworthy without exposing the complexity of the underlying system?`,
        },
        {
          type: "learning",
          hideEyebrow: true,
          title: "The Anticipation Layer",
          body: "Sports are inherently biased. Neutral AI commentary felt cold and disconnected from the high-stakes reality of a live match. How might we personalize AI without compromising factual accuracy?",
        },
        {
          type: "impact",
          hideEyebrow: true,
          title: "The Conversion Layer",
          body: `How might we expose the product's unique intelligence at the moment users are most likely to convert?`,
        },
      ],
    },
    {
      id: "flow-redesign",
      eyebrow: "",
      flowChanges: [
        {
          label: "Pre Redesign",
          tone: "pre",
          note: "Trial conversion: 2.7%",
          steps: [
            "Home Page",
            "Tap Match Card",
            "Generic Commentary",
            "Locked Win Prediction",
            "Start Free Trial",
            "Plan Selection",
            "Drop-off Point",
            "Enter Payment Details",
            "Confirm Trial",
            "Trial Completion",
          ],
        },
        {
          label: "Post Redesign",
          tone: "post",
          note: "Trial conversion: **7.8**%",
          steps: [
            "Home Page",
            "Tap Match Card",
            "Unlocked Live Match Screen",
            "AI Commentary",
            "Inline Predictions",
            "Contextual Free-trial CTA",
            "Plan Selection",
            "Enter Payment Details",
            "Confirm Trial",
            "Trial Completion",
          ],
        },
      ],
      continuedParagraphs: ["##Exploring directions"],
      media: [
        {
          type: "image",
          src: "/Work/Images/Trade%20off.png",
          width: 3700,
          height: 2172,
          fit: "contain",
          unoptimized: true,
          alt: "Six labeled mobile explorations for AI cricket commentary: player on pitch layout, in between overs with AI, fan biased commentary, innings break, milestone cards, and audio commentary",
        },
      ],
    },
    {
      id: "free-vs-paid",
      eyebrow: "Monetisation",
      title: "Free vs paid experience",
      continuedParagraphs: [
        "!!Key product questions to solve were:",
        "**1. When should we interrupt users?** We needed to identify high-impact moments that added value without overwhelming users.",
        "**2. How should commentary adapt to different fans?** A casual fan, a fantasy player, and a die-hard supporter all seek different levels of detail, tone, and bias.",
        "**3. How do we combine live events with predictive insights?** Instead of describing what just happened, we wanted to predict what can happen in the next over to make the match more engaging.",
        "**4. How do we keep commentary trustworthy at live-match speed?** The experience had to feel instant while remaining accurate, contextual, and consistent as the game evolved.",
        "!!Outcome",
        "These constraints ultimately guided us toward a solution that delivered contextual AI insights with minimal engineering effort, low latency, and a simple, focused user experience.",
      ],
      media: [
        {
          type: "image",
          src: "/Work/Images/Free%20vs%20Paid.png?v=20260708-0116",
          width: 2772,
          height: 4700,
          fit: "cover",
          objectPosition: "center",
          alt: "Comparison of free and paid AI commentary experiences across live feed and homepage screens",
          unoptimized: true,
        },
      ],
    },
    {
      id: "pre-live-story",
      eyebrow: "Pre-live story",
      media: [
        {
          type: "image",
          src: "/Work/Images/Pre%20live%20story.png",
          width: 3700,
          height: 2572,
          fit: "contain",
          unoptimized: true,
          alt: "Pre-live experience across three phone screens: playing XI, AI match preview, and pitch report",
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
        },
        {
          type: "image",
          src: "/Work/Images/Fan%20biased%20commentary.png",
          width: 3700,
          height: 2172,
          fit: "contain",
          unoptimized: true,
          alt: "Fan biased commentary experience showing side selection and personalized AI commentary for IND versus ENG",
          caption: "Fan biased commentary — choose a side to personalize the live AI commentary tone",
        },
      ],
    },
    {
      id: "outcomes",
      eyebrow: "Outcomes",
      title: "Impact that moved the business",
      paragraphs: [
        "The redesign moved the needle on the most critical growth metrics:",
      ],
      funnelMetrics: [
        { label: "Free Trial Starts", value: "7.8%" },
        { label: "Feature Adoption", value: "30%" },
        { label: "Average Time Spent", value: "~16 min" },
        { label: "D7 Retention", value: "51.8%" },
        { label: "New paid users post redesign", value: "~87/day" },
      ],
      funnelFollowUp: [
        {
          type: "paragraph",
          text: "**Conversion Power:** Free Trial Availed jumped from 2.67% → 7.00% (+162%). This validated that surfacing the value of the AI early was more effective than any pricing change.",
        },
        {
          type: "paragraph",
          text: `**Stickiness:** DAU stabilized at ~10,118, up from a pre-redesign average of 5,000. The "weekend effect" (peaking at 31k) showed that our AI became a "second screen" staple during live events.`,
        },
        {
          type: "paragraph",
          text: "**Monetization Baseline:** We achieved a steady growth of ~87 new paid users/day, proving the 0→1 model was ready for scale.",
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
        "Narrative beats numbers- users engage with stories, not confidence intervals",
        "Preview the premium experience during peak emotion, not at onboarding",
        "Design for interruption- live sport is chaotic; UI must be glanceable",
        "Cross-functional alignment early prevents costly pivots late in the cycle",
      ],
      postCalloutParagraphs: [
        "!!AI features don't succeed on intelligence alone. They succeed when the experience feels human, timely, and worth coming back to.",
      ],
    },
  ],
};
