# My Raw Annotations and Notes from "Build: Elements of an Effective Software Organization" by Rebecca Murphey & Otto Hilska

128 pages. A good, short read. A primer on developer experience. Recommended.

## 1 - Introduction

### Measurement and Goal Setting

> Sometimes, all you need to do is (1) make sure no one things The Thing is a
> terrible idea, (2) do The Thing, and (3) check in with your users or
> stakeholders to see whether they noticed that you did The Thing. Don't fall
> into the trap of delaying action - and thereby delaying benefit - just because
> you haven't yet worked out how you'll count something.

> Self-reported satisfaction scores, for example, are deeply subject to
> moment-in-time bias [...] They can drop quickly and tend to recover slowly.

> Be especially wary of setting goals around human-reported metrics

### Choosing metrics and tracking progress

When discussing goals, signals, and metrics:

> [...] the "I know it when I see it" conversation - what statements, if true,
> would have everyone nodding in agreement that you were progressing? These are
> your signals.

> [...] don't beat yourself up to measure something when broad agreement about
> the existence of a clear signal would be sufficient to declare success, nor
> when the change has another, more notable business impact.

> Keep your focus on making things easier for engineers, use that focus to
> motivate increased observability of processes, execute on the opportunities
> you find, and know that quantitative data will sometimes disagree with the
> stories you've been told.

### Table Stakes

> (1) Empowered Teams - Empowering teams means delegating decision-making
> authority to those closest to the work. Providing teams with the necessary
> context and trusting them to make informed decisions can enhance efficiency
> and motivation.

> Note that this doesn't mean all decisions should or will fall to individual
> teams; some decisions properly belong at the organization or even business
> level.

> (2) Rapid Feedback

> (3) Outcomes over outputs

> When you align team objectives with business outcomes and use metrics that
> reflect these outcomes, you encourage innovation and creative problem-solving,
> ensuring that the work contributes effectively to the organization's goals.

#### An Outcome-based approach

> The **definition of success** will be the impact on customer behavior and
> business results, such as improved customer satisfaction or increased sales.
>
> **Key metrics** include customer engagement metrics, conversion rates, market
> share, and revenue growth.
>
> **Development focus** is on validating hypotheses about customer needs and
> business value by delivering the smallest viable increment.
>
> The **feedback loop** is based on how well the product changes user behavior
> or improves key business metrics.
>
> **Decision-making** is driven by data and insights about what will move the
> needle on desired outcomes.
>
> **Changes** are view as opportunities to learn and pivot toward more impactful
> results.
>
> **Cross-functional teams** work collaboratively, with a shared undersatnding
> that the goal is to achieve the desired outcomes.
>
> **Failure** is viewed as a learning opportunity that informs the next
> iteration and brings the team closer to achieving the outcomes.

## 2 - Business Outcomes

> Achieving business outcomes [...] requires delivering tangible results that
> align with business objectives, all while maintaining product quality,
> efficient feature delivery, operational stability, and user satisfaction.

### What is a team?

> If a group of people can only create value in partnership with another group,
> they're not a team.

### Different kinds of teams for different purposes

> The idea with platform teams is that whatever your company is doing a lot of,
> it should get really good at doing.

Examples of platform needs:

> CI/CD pipelines [...], design systems [...], and scaffolding to deploy
> services [...] with security and compliance requirements met and with a good
> developer experience.

> tech companies often invest 30-50% of their engineers in platform teams

> you tend to see a platform team break into several sub-teams, each focused on
> providing a specific type of value to product team engineers

> be aware that [Temporary or project-based teams] might leave behind code whose
> ownership is questionable

### Tradeoffs in organization design

> Excessive autonomy can lead to inconsistent organizational practices and
> difficulties integrating work from different teams

> [Coordination] has the potential to slow down some decision-making processes
> and stifle innovation and ownership at the team level

### Roles and reporting lines

> VPs tend to be execution-oriented, while CTOs focus on providing a strategic
> and technical vision

> Product roles [...] often report separately from engineering roles, but
> individual product managers and product designers are assigned to individual
> teams.

### Teams as a strategic investment

> High-performing teams are an exception [...] they don't just happen

> In contemporary thinking, teams are conceived not just as functional units
> executing predetermined tasks but instead as strategic investments.

> High-performing teams require time to form, good leadership to remain
> motivated, and clear areas of ownership and autonomy.

> teams need to be held accountable for the outcomes they achieve

> Ensuring teams have the necessary resources [...] is a key aspect of treating
> the team as an investment

### Balancing at the team level

Matt Eccleston's Balance Framework - New things, improving things, productivity
and KTLO.

> Setting an investment balance intention at the team level can help make future
> decisions more straightforward

### Usign the Balance Framwork to improve effectiveness

> The main challenge of the Balance Framework is that it requires you to adopt a
> taxonomy when labeling work across your engineering processes so that you can
> associate each unit of work with a Balance Framework category.

### Setting Priorities

> When engineers feel like prioritization is poor and nothing is changing, they
> often stop giving feedback. Leadership will only see the effects of poor
> prioritization on teams and struggle to understand the underlying issues that
> led to those effects.

> True priorities should highlight the areas where effort will have the most
> impact on the organization's goals.

> When priorities are clear, the organization focuses on strategic outcomes
> while day-to-day operations continue without major disruption.

### Team-level OKRs

> When OKRs focus only on new work, a team or individual can end up in a
> situation where their extremely necessary KTLO work is undervalued.

### A note on OKRs for platform teams

> Platform groups face a unique scenario when it comes to OKRs. These groups
> find OKRs most beneficial when the group thinks of itself as owning a product
> rather than just maintaining a set of services or capabilities.

### Managing Cross-team Initiatives

> Successfully and predictably leading complex, cross-cutting initiatives in a
> software engineering organization requires timely, accurate, trustworthy data
> about the work that's being done toward completing the initiative.

> Teams should break down work into small increments - tasks that can be
> completed in one or two days.

> Promote and cultivate a growth mindset, encouraging teams to revisit and
> revise plans as new information becomes available.

## 3 - Developer Productivity

The problem is often **process bottlenecks**.

### Productivity table stakes

> (1) Limited queue depth (backlog)
>
> (2) Small batch sizes
>
> (3) Limited work-in-progress (WIP)

> [...] ensure that valuable and time-sensitive tasks are getting addressed
> promptly

### Productivity vs. quality

> Fascinatingly [...] if you're doing productivity right, quality will tend to
> increase over time, as it becomes easier to ship smaller changes and easier to
> roll back or disable features.

> **Make it easy to write tests**. [...] Educate your engineers on how to use
> testing tools, making setup easy.

> **Make it easy to get the right data**. Tests shouldn't be talking to
> production to get data, but they need data that's a realistic simulation of
> the kind you'd see in production.

> **Make it easy to manually test**. [...] Make it easy to interact with code
> that's on a feature branch.

> **Make it easy to release (and roll back) small changes**. One of the reasons
> teams get in a position of doing a ton of pre-release manual testing is that
> the release process itself is so onerous - and the rollback process is worse.

> Add a ratchet to CI to make sure test coverage of your code only goes up, and
> incentivize writing tests and sharing strategies within and across teams.

### Frameworks for thinking about productivity

> The aim isn't to become obsessed with numbers but to continually evaluate
> whether you're satisfied with what the numbers are telling you.

### Deployment frequency

> For a mobile app with an extensive QA process, getting to a two-week release
> cadence is already a good target, while the best teams building web backends
> deploy to production whenever a change is ready.

> If the build passes, can we feel good about deploying to production? If not,
> you'll likely want to start building tests from the top of the pyramid [...]

> If the build fails [...] you need to understand which tests are causing most
> of your headaches

### Setting goals around productivity

> In many ways, the core DORA metrics cover the activity pillar in SPACE, and
> establishing them within your organization will quickly highlight potential
> opportunities.

> SPACE is great as a framework to classify problems and brainstorm specific
> metrics you might use to track trends and validate improvements.

### Tools and Tactics

> Before you do anything else with developer productivity, ensure there's
> general agreement on reducing interruptions

## 4 - developer experience

### measuring developer experience

> developer experience metrics are more qualitative [...] it's table stakes to
> capture employee satisfaction and engagement data.

### identifying improvements

> **the people whose productivity you are trying to improve are the best source
> of information about what needs improving.** you can better understand their
> needs by approaching this on two fronts: talking to the users of your internal
> development systems and collecting data about tool behavior as engineers go
> about their day.

> talk to your users

> many or even most of the ideas you'll come across will have technical
> solutions, but don't tune out people, processes, and political challenges that
> merit different approaches. Increasing engineering leverage without spending
> engineering time could be a huge win.

### collect empirical data

> [...] it's essential to have quantitative data to help guide your
> prioritization and validate the qualitative stories you hear.

> It's relatively easy to build observability into your internal tooling.

> An internal tool should be able to record every invocation and its outcome,
> along with various metadata about the interaction. Most importantly, it should
> record **how long a developer has waited to get output from the tool**.

### Internal support

> When knowledge becomes the domain of a select few and isn't disseminated
> broadly, it creates an environment where constant queries become the norm.

> You can solve [knowledge siloing] through knowledge-sharing sessions, and
> partnering on tasks unfamiliar to other team members.

### External support

> Continually analyze your support workload to find things you could proactively
> address.

### Are you interruption-aware?

> The goal isn't to eliminate them entirely but rather to measure, reduce, and
> manage them in a way that aligns with the team's needs and the organization's
> objectives.

### Setting experience goals

> Accept satisfaction surveys [...] as a lagging indicator as you [work to]
> improve [the sources of interruptions].

## 5 - putting it all together

### Convenient fallacies to avoid

> **"We aren't doing enough up-front requirement-gathering"** [...] Adhering too
> rigidly to initial specifications leads to inefficiency and stifles innovative
> solutions.

> **"What we really need is more people"** [...] Effective productivity stems
> from ruthless prioritization and managing and optimizing the workload and
> capabilities of the existing team, not indiscriminately increasing team size.

> **"We just need to plan better"** [...] Effective planning requires balance -
> it provides direction, but not so much that it impedes flexibility and rapid
> response to change.

### Keep effectiveness top of mind

> Encourage your team to experiment with new methods, tools, and processes.

### Know when to move on

> [Once a bottleneck is addressed and resolved] it's time to move from actively
> working on [it] toward monitoring it to ensure there's no backsliding.

### Driving an effectiveness effort

The BRAINS framework - Baseline, Research, Act, Invest, Normalize, Sustain.

> A platform team's ultimate goal is to help those users produce more value for
> the same amount of effort.

> [...] be sure to frame migration and usage instructions from the perspective
> of the platform **user**, not the platform creator.

### Managing change

BICEPS framework by Paloma Medina

> change is hard and thus needs to be approached with care.
