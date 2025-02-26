# My Raw Annotations and Notes from "Build: Elements of an Effective Software Organization" by Rebecca Murphey & Otto Hilska

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
