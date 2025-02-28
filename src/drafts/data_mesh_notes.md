## Highlights

- Page Xv: "data swamp"

- Page Xv:

  > By treating their data as a first class product, they communicate the
  > meaning and provenance of the data, and they collaborate with their
  > consumers.

- Page Xvi:

  > there's a great deal involved in making this work, particularly since so
  > much vendor investment has focused on centralized models, exacerbated by not
  > supporting the practices (such as testing, abstraction building, and
  > refactoring) that developers of operations systems know are essential for
  > healthy software.

- Page Xvii:

  > This new trajectory moves us away from the centralization of data and its
  > ownership toward a decentralized model.

- Page Xviii:

  > I wanted to make sure, before we get carried away with building new
  > technical solutions, we understand why we need to make a change, what the
  > problems we are trying to address are, and how we are trying to do that.

- Page Xix:

  > Infrastructure product owners, architects, and engineers should read this
  > book to understand the role and design of a self-serve data platform to
  > create a well-integrated set of services that enable data sharing
  > decentrally at scale and by cross-functional domain teams.

- Page 6:

  > I have decided to classify data mesh as a sociotechnical paradigm: an
  > approach that recognizes the interactions between people and the technical
  > architecture and solutions in complex organizations.

- Page 6:

  > the objec‐ tives of data mesh: increase value from data at scale, sustain
  > agility as an organization grows, and embrace change in a complex and
  > volatile business context.

- Page 8:

  > The platform services are centered around removing friction from the
  > end-to-end journey of data sharing, from source to consumption. The platform
  > services manage the full life cycle of individual data products. They manage
  > a reliable mesh of interconnected data prod‐ ucts. They provide mesh-level
  > experiences such as surfacing the emergent knowledge graph and lineage
  > across the mesh. The platform streamlines the experience of data users to
  > discover, access, and use data products. It streamlines the experience of
  > data providers to build, deploy, and maintain data products.

- Page 8:

  > Mobilize a larger population of developers—technology generalists—to embark
  > on data product development and reduce the need for specialization.

- Page 22:

  > Note that source-aligned analytical data is not modeled or accessed directly
  > from the source application's (private) transactional database. Exposing
  > analytical data directly from the operational database is an antipattern.
  > This antipattern is observed in the implementation of ETLs and application
  > of change data capture3 and data virtualiza‐ tion4 on top of the
  > application's database. The application database model serves a very
  > different purpose and is often modeled for speed of performing transactions
  > as needed by the application and its end users. The analytical data is
  > stored and structured for ease of understanding and access for reporting,
  > machine learning training, and nontransactional workloads. The analytical
  > data life cycle is different from the source application's operational
  > database. Not every change to optimize the application database leads to
  > analytical data changes, and not every new transformation of analytical data
  > requires changes to its source application database. The nature of the
  > domain analytical data is different from the internal data that the
  > operational systems use to do their job. Chapter 1 captures the differences
  > between the two data types. For these reasons, at this point in time, data
  > mesh differentiates between the source application's operational database
  > and its collaborating analytical data storage. While the two types of data
  > are considered separate, they are tightly integrated and owned by the same
  > domain team.

- Page 23:

  > I strongly caution you against creating ambitious aggregate domain
  > data—aggregate domain data that attempts to capture all facets of a
  > particular concept, like listener 360, and serve many organizationwide data
  > users. Such aggregates can become too complex and unwieldy to manage,
  > difficult to understand and use for any partic‐ ular use case, and hard to
  > keep up-to-date. In the past, the imple‐ mentation of Master Data Management
  > (MDM)5 has attempted to aggregate all facets of shared data assets in one
  > place and in one model. This is a move back to single monolithic schema
  > modeling that doesn't scale. Data mesh proposes that end consumers compose
  > their own fit-forpurpose data aggregates and resist the temptation of highly
  > reusable and ambitious aggregates.

- Page 25:

  > Data warehousing techniques and central data governance teams have been in
  > search of the one canonical model holy grail. It's a wonderful idea, one
  > model that describes data domains and can be used to provide a shared
  > meaning to all data users. But in reality systems are complex and
  > continuously changing, and no one model can tame this messy life of data.
  > Data mesh in contrast follows DDD's bounded context and context mapping for
  > data modeling. Each domain can model its data according to its context,
  > share this data and its models with others, and identify how one model can
  > relate and map to others. This means there could be multiple models of the
  > same concept in different domains and that is OK. For example, the artist
  > representation in the payment includes payment attributes, which is very
  > different from the artist model in the recommen‐ dation domain, which
  > includes the artist profile and genre. But the mesh should allow mapping an
  > artist from one domain to another and be able to link artist data from one
  > domain to the same artist in another. There are multiple ways to achieve
  > this, including a unified identification scheme, a single ID used by all
  > domains that include an artist.

- Page 26:

  > Long-term domain-oriented ownership with accountability to share
  > discoverable, high-quality, and usable data—in multiple modes for analysts
  > and scientists—reduces the need for copying and keeping stale data around.

- Page 26:

  > the data mesh platform observes the mesh, pre‐ vents errors that often arise
  > when data gets copied, and surfaces the most relevant and reliable data.

- Page 26:

  > when transi‐ tioning to data mesh, you will be redistributing different
  > pipelines and their jobs to different domains.

- Page 27:

  > the source-aligned domains need to include the cleansing, deduplicat‐ ing,
  > and enriching of their domain events so that they can be consumed by other
  > domains, without replication of cleansing downstream.

- Page 27:

  > Arranging data and its ownership around technology has been an impediment to
  > scale; it simply has been orthogonal to how change happens and features
  > develop. Centrally organized data teams have been the source of friction.
  > There is an alterna‐ tive. The alternative is a tried and tested method to
  > scale modeling at the enterprise level: domain-driven bounded context
  > modeling.

- Page 27:

  > Data mesh adapts the concept of domain bounded contexts to the world of
  > analytical data. It demands domain teams who are closest to the data own the
  > analytical data and serve the domain's analytical data to the rest of the
  > organization. Data mesh sup‐ ports the creation of new domains' data by
  > composing, aggregating, and projecting existing domains.

- Page 29:

  > A recent report from Anaconda, a data science platform company, "The State
  > of Data Science 2020", finds that nearly half of a data scientist's time is
  > spent on data preparation—data loading and cleansing. If not addressed, this
  > problem only exacerbates with data mesh, as the number of places and teams
  > who provide data, i.e., domains, increases. Distribution of the
  > organization's data ownership into the hands of the business domains raises
  > important concerns around accessibility, usability, and harmonization.
  > Further data siloing and regression of data usability are potential
  > undesirable consequences of data mesh's first principle, domain-oriented
  > ownership. The principle of data as a product addresses these concerns.

- Page 29:

  > The second principle of data mesh, data as a product, applies product
  > thinking to domain-oriented data to remove such usability frictions and
  > truly delight the experi‐ ence of the data users—data scientists, data
  > analysts, data explorers, and anyone in between. Data as a product expects
  > that the analytical data provided by the domains is treated as a product,
  > and the consumers of that data should be treated as customers— happy and
  > pleased.

- Page 29:

  > data as a product underpins the case for data mesh, unlocking the value of
  > an organization's data by dramatically increasing the potential for
  > serendipitous and intentional use.

- Page 30:

  > For data to be a product, it must be valuable to its users—on its own and in
  > cooperation with other data products. It must demonstrate empathy for its
  > users and be accountable for its usability and integrity.

- Page 30:

  > data as a product inverts the model of responsibility. In data lake or data
  > warehousing architectures the accountability of creating data with quality
  > and integrity resides downstream from the source and remains with the
  > centralized data team. Data mesh shifts this responsibility close to the
  > source of the data. This transition is not unique to data mesh; in fact,
  > over the last decade we have seen the trend of shift left with testing and
  > operations, on the basis that addressing problems is cheaper and more
  > effective when done close to the source.

- Page 31:

  > Applying the magic ingredient of product thinking to internal technology
  > begins with establishing empathy with internal consumers (i.e., fellow
  > developers), collaborating with them on designing the experience, gathering
  > usage metrics, and continuously improving the internal technical solutions
  > over time to maintain ease of use

- Page 31:

  > Curiously, the magical ingredient of empathy, treating data as a product and
  > its users as customers, has been missing in big data solutions. Operational
  > teams still perceive their data as a byproduct of running the business,
  > leaving it to someone else, e.g., the data team, to pick it up and recycle
  > it into products. In contrast, data mesh domain teams apply product thinking
  > with similar rigor to their data, striving for the best data user
  > experience.

- Page 32:

  > Source-aligned data products need to balance the 32 | Chapter 3: Principle
  > of Data as a Product

- Page 33:

  > immediate known use cases and the unknown ones. They have no choice but to
  > strive to model the reality of the business, as closely as possible, in
  > their data, without too much assumption in how it will be used.

- Page 34:

  > A traditional implementation of discoverability is a centralized registry or
  > catalog listing available datasets with some additional information about
  > each dataset, the owners, the location, sample data, etc. Often this
  > information is curated after the fact by the centralized data team or the
  > governance team.

- Page 37:

  > Data product SLOs include, among others: Interval of change How often
  > changes in the data are reflected Timeliness The skew between the time that
  > a business fact occurs and becomes available to the data users Completeness
  > Degree of availability of all the necessary information Statistical shape of
  > data Its distribution, range, volume, etc. Lineage The data transformation
  > journey from source to here Precision and accuracy over time Degree of
  > business truthfulness as time passes Operational qualities Freshness,
  > general availability, performance

- Page 37:

  > data mesh introduces a fundamental shift that the owners of the data
  > products must communicate and guarantee an acceptable level of quality and
  > trust‐ worthiness—specific to their domain—as an intrinsic characteristic of
  > their data product. This means cleansing and running automated data
  > integrity tests at the point of the creation of a data product.

- Page 39:

  > Here are a few things data products need to standardize to facilitate
  > interoperability and composability: Field type A common explicitly defined
  > type system Polysemes identifiers Universally identifying entities that
  > cross boundaries of data products Data product global addresses A unique
  > global address allocated to each data product, ideally with a uniform scheme
  > for ease of establishing connections to different data products Common
  > metadata fields Such as representation of time when data occurs and when
  > data is recorded Schema linking Ability to link and reuse
  > schemas—types—defined by other data products Data linking Ability to link or
  > map to data in other data products Schema stability Approach to evolving
  > schemas that respects backward compatibility

- Page 39:

  > Interoperability is the foundation of any distributed system design, and
  > data mesh is no exception.

- Page 40:

  > there is a common antipattern when migrating from a warehouse architecture
  > to data mesh: directly mapping warehouse tables to data products can create
  > data products with no value. In the data warehouse, there are glue (aka
  > facts) tables that optimize correlation between entities. These are identity
  > tables that map identifiers of one kind of entity to another. Such identity
  > tables are not meaningful or valuable on their own—without being joined to
  > other tables. They are simply mechanical implementations to facilitate
  > joins. On the contrary, there are no mechanical data products that solely
  > exist to enable the machines to correlate information across the mesh.
  > Machine optimizations such as indices or fact tables must be automatically
  > created by the platform and hidden from the product products.

- Page 42:

  > The introduction of analytical data as a product adds to the list of
  > existing responsi‐ bilities of cross-functional domain teams and expands
  > their roles to: Data product developer The role responsible for developing,
  > serving, and maintaining the domain's data products as long as the data
  > products live and are being used Data product owner The role accountable for
  > the success of a domain's data products in delivering value, satisfying and
  > growing the data users, and maintaining the life cycle of the data products
  > Define these roles for each domain and allocate one or multiple people to
  > the roles depending on the complexity of the domain and the number of its
  > data products.

- Page 42:

  > the word extraction used in ETL (extract, transform, load) and its other
  > variations needs to be critically evaluated. Extraction evokes a passive
  > role for the provider and an intrusive role for the consumer. As we know,
  > extracting data from an operational database that is not optimized for
  > external use other than its own applica‐ tion creates all kinds of
  > pathological coupling and a fragile design. Instead, we can shift the
  > language to publish, serve, or share. This implies shifting the
  > implementation of data sharing from accessing raw databases to intentionally
  > sharing domain events or aggregates.

- Page 43:

  > I suggest the change of metaphor to data as a product, and a change of
  > perspective that comes with that, for example, measuring success through
  > adoption of data, its number of users, and their satisfaction using the
  > data. This underscores sharing the data versus keeping and locking it up. It
  > puts emphasis on the continuous care that a quality product deserves.

- Page 45:

  > Data as a product creates a new system of the world, where data is and can
  > be trusted, built, and served with deep empathy for its users, and its
  > success is measured through the value delivered to the users and not its
  > size. This ambitious shift must be treated as an organizational
  > transformation.

- Page 52:

  > For the platform to be successfully adopted with existing domain technology
  > teams, it must remove the barriers to adoption, the schism between the
  > operational and analytical stacks.

- Page 52:

  > In order to create data products that collaborate closely with their
  > corresponding microservice, i.e., source-aligned data products, we need a
  > closer integration of the computation fabrics.

- Page 53:

  > Incentivizing and enabling generalist developers with experiences,
  > languages, and APIs that are easy to learn is a starting point to lower the
  > cognitive load of generalist developers. To scale out data-driven develop‐
  > ment to the larger population of practitioners, data mesh platforms must
  > stay relevant to generalist technologists. They must move to the background,
  > fit naturally into the native tools and programming languages generalists
  > use, and get out of their way.

- Page 57:

  > Provisioning and managing the underlying infrastructure for life cycle
  > management of a data product requires specialized knowledge of today's
  > tooling and is difficult to replicate in each domain. Hence, the data mesh
  > platform must implement all necessary capabilities allowing a data product
  > developer to build, test, deploy, secure, and maintain a data product
  > without worrying about the underlying infrastructure resource provisioning.
  > It must enable all domain-agnostic and cross-functional capabilities.

- Page 58:

  > An interesting lens on the data mesh platform is to view it as a multisided
  > platform —one that creates value primarily by enabling direct interactions
  > between two (or more) distinct parties. In the case of data mesh, those
  > parties are data product developers, data product owners, and data product
  > users.

- Page 58:

  > an important aspect of exchanging value is to be able to do that
  > autonomously, without the platform getting in the way. For data product
  > developers, this means being able to create and serve their data products
  > without the constant need for hand-holding or dependency on the platform
  > team.

- Page 59:

  > Platforms are increasingly considered a way of reducing the cognitive load
  > of devel‐ opers to get their job done. They do this by hiding the amount of
  > detail and informa‐ tion presented to the developer: abstracting complexity.

- Page 60:

  > systems that can be described through their state, such as provisioned
  > infrastructure, lend themselves well to a declarative style. This is also
  > true about the data mesh infrastructure as a platform. The target state of
  > infrastructure to manage the life cycle of a data product can be defined
  > declaratively.

- Page 60:

  > Removing the human intervention and manual steps from the data product
  > developer journey through automation is another way to reduce complexity,
  > particularly com‐ plexity arising from manual errors through the process.

- Page 61:

  > For observability to work, there are multiple platform services that need to
  > cooperate: the data products emitting and logging information about their
  > operation; the service that captures the emitted logs and metrics and
  > provides a holistic mesh view; the services that search, analyze, and detect
  > anomalies and errors within those logs; and the services that notify the
  > developers when things go wrong.

- Page 62:

  > to grow a culture of innovation—a culture of rapidly building, testing, and
  > refining ideas—we need an environment that frees its people from unnecessary
  > work and accidental complexity and friction and allow them to experi‐ ment.
  > The data mesh platform removes unnecessary manual work, hides complexity,
  > and streamlines the workflows of data product developers and users, to free
  > them to innovate using data. A simple litmus test to assess how effective a
  > data mesh platform is in doing that is to measure how long it takes for a
  > team to dream up a data-driven experiment and get to use the required data
  > to run the experiment. The shorter the time, the more mature the data mesh
  > platform has become.

- Page 63:

  > In the last few years the industry has experienced an overinvestment in
  > technologies that are marketed as data solutions. In many cases their
  > operational counterparts are perfectly suitable to do the job.

- Page 66:

  > Its purpose is to give domain teams superpowers, by hiding low-level
  > complexity behind simpler abstractions and removing friction from their
  > journeys in achieving their outcome of exchanging data products as a unit of
  > value. And ultimately it frees up the teams to innovate with data. To scale
  > out data sharing, beyond a single deployment environment or organizational
  > unit or company, it favors decentralized solutions that are interoperable.

- Page 68:

  > Looking at the word governance, its definition softens from "to rule with
  > authority" to its original meaning of "to steer and guide—a vessel." I chose
  > to keep the word governance in the data mesh vocabulary, but I intend for it
  > to carry its original meaning and not its later definitions.

- Page 68:

  > Distribution of data ownership to individual domains raises concerns around
  > the interoperability of the data and standardization of data commu‐
  > nication, e.g., standardization of data presentation and querying across all
  > domains.

- Page 74:

  > Data mesh is a dynamic system with a continuously changing topology. The
  > shape of the mesh continuously changes. New data products get created, old
  > data products retire, and existing data products continue to morph their
  > logic, data, and structure. The governance model must work with continuous
  > change across the mesh, without interrupting the experience of the mesh
  > consumers.

- Page 77:

  > The governance is composed of a cross-functional team of representatives
  > from domains, as well as platform experts and subject matter experts from
  > security, compliance, legal, etc.

- Page 77:

  > The following section lists some of the basic and essential roles that make
  > up a multidisciplinary federated team. The team collectively takes the
  > responsibility of: • Deciding what policies must be implemented by all data
  > products • • • How the platform must support these policies computationally
  > • • How data products adopt the policies

- Page 77:

  > Data product owners are the long-term owners of the domains' data products.
  > They intrinsically care about the longevity and success of their data
  > product as a member of the mesh. They have accountability for the security,
  > quality, and integrity of their data. Given the guiding principle of
  > executing decisions locally, the data product owners are ultimately
  > accountable for making sure the global governance decisions are executed at
  > the level of every single data product. Early buy-in and contribution of
  > domains to define the global policies is crucial in adoption of them.

- Page 77:

  > Nearly all governance decisions rely on platform automation. This demands
  > close collaboration between the platform team and the governance function.
  > The automa‐ tions may be in the form of enablement, monitoring, or recovery.

- Page 80:

  > To provide a consistent experience of understanding data products across the
  > mesh, the decision of how data products encode and share their semantic and
  > syntax schema becomes a global concern. This decision will be automated by
  > the platform to provide a set of tools to create, verify, and share data
  > product schemas. Each data product utilizes the platform tooling to comply
  > with this global standard.

- Page 83:

  > To resolve this conflict and encourage the domains to participate in global
  > policies, the incentives of data product owners must be augmented. In
  > addition to their local incentives, they need to be rewarded and motivated
  > by the degree of adoption of global policies.

- Page 87:

  > For example, the governance function is accountable to define what
  > constitutes data quality and how each data product communicates that in a
  > standard way. It's no longer accountable for the quality of each data
  > product. The platform team is accountable to build capabilities to validate
  > the quality of the data and communicate its quality metrics, and each domain
  > (data product owner) is accountable to adhere to the quality standards and
  > provide quality data products.

- Page 88:

  > Standardizing how polysemes are modeled, identified, and mapped across
  > domains is a global governance function.

- Page 88:

  > Governance success is measured based on the network effect of the mesh and
  > the number of these interconnections.

- Page 91:

  > The continuous need for trustworthy and useful data across multiple domains
  > to train ML-based solutions will be the ultimate motivator for the adoption
  > of data mesh governance and doing the right thing.

- Page 97:

  > the expectation is to democratize data so that the majority of the workforce
  > can put data into action.

- Page 99:

  > The current state of data technology, architecture, and organization design
  > is reflec‐ tive of the divergence of the analytical and operational data
  > planes—two levels of existence, integrated yet separate. Each plane operates
  > under a different organiza‐ tional vertical. BI, data analytics, and data
  > science teams, under the leadership of a chief data and analytics officer (
  > CDAO), manage the analytical data plane, while business units and their
  > collaborating technology team manage the operational data. From a technology
  > perspective, two fragmented technology stacks have grown to each serve a
  > plane. There is limited overlap between the two stacks. This divergence has
  > led to the two-plane data topology and a fragile integration archi‐ tecture
  > between the two. The operational data plane feeds the analytical data plane
  > through a set of scripts or automated processes often referred to as ETL
  > jobs—extract, transform, and load. Often operational databases have no
  > explicitly defined contracts with the ETL pipelines for sharing their data.
  > This leads to fragile ETL jobs where unanticipated upstream changes lead to
  > downstream pipeline failures. Over time the ETL pipelines grow in
  > complexity, trying to provide various transformations over the operational
  > data, flowing data from the operational data plane to the analytical plane
  > and back to the operational plane (Figure 6-3). The challenges of two-plane
  > data management, including the brittle integration architecture of the
  > pipelines and a centralized data warehouse or lake to access data, are one
  > of the major drivers to imagine a future solution.

- Page 101:

  > unprecedented scale of the diversity of sources requires a shift in data
  > manage‐ ment—a shift away from collecting data from sources in one big,
  > centralized place to connecting data, wherever it is.

- Page 101:

  > Data platforms must close the distance—time and space—between when an event
  > happens and when it gets analyzed. Analytics solutions must guide real-time
  > decision making. Rapid response to change is no longer a premature
  > optimization7 of business: it's a baseline feature. Data management of the
  > future must build in embracing change, by default. Rigid data modeling and
  > querying languages that expect to put the system in a straitjacket of a
  > never-changing schema can only result in a fragile and unusable analytics
  > system. Data management of the future must embrace the complex nature of
  > today's organi‐ zations and allow for autonomy of teams with peer-to-peer
  > data collaborations. Today, the complexity has stretched beyond the surface
  > of the business to its physical platforms. In many organizations, data
  > platforms span multiple clouds and on-prem providers. The data management of
  > the future must support managing and accessing data across multiple hosting
  > platforms, by default.

- Page 103:

  > Data mesh assumes a new default starting state: proliferation of data
  > origins within and beyond organizations' boundaries, on one or across
  > multiple cloud platforms. It assumes a diverse range of use cases for
  > analytical data. It works with the grain of a highly complex and volatile
  > organizational environment, and not against it.

- Page 105:

  > Data mesh assumes the environmental conditions I introduced in the previous
  > chap‐ ter as a default state. By default, data mesh assumes the ubiquitous
  > nature of data. Data can be of any origin; it can come from any system
  > within an organization, or outside, and across boundaries of organizational
  > trust. Any underlying platform can serve it on one cloud hosting service or
  > another. Data mesh assumes the diversity of data use cases and their unique
  > modes of access to data. The data use cases range from historical data
  > analysis and reporting to training machine learning models and
  > data-intensive applications. And lastly, data mesh assumes complexity of the
  > business landscape—continuous growth, change, and diversity—as a natural
  > state of being. Data mesh learns from the past solutions and addresses their
  > shortcomings. It reduces points of centralization that act as coordination
  > bottlenecks. It finds a new way of decomposing the data architecture without
  > slowing the organization down with synchronizations. It removes the gap
  > between where the data originates and where it gets used and removes the
  > accidental complexities—aka pipelines—that happen in between the two planes
  > of data. Data mesh departs from data myths such as a single source of truth,
  > or one tightly controlled canonical data model.

- Page 106:

  > Data mesh outcomes can be summarized as (Figure 7-1): • • Respond gracefully
  > to change: a business's essential complexity, volatility, and uncertainty •
  > Sustain agility in the face of growth • • • Increase the ratio of value from
  > data to the investment

- Page 107:

  > Just as a business divides its work through business domains, technology
  > can, and should, align itself to these business divisions. Modern digital
  > businesses orient their technology staff around their business units,
  > allowing each business unit to be supported, enabled, and shaped by
  > dedicated digital products and services, built and maintained by a
  > long-standing dedicated technology team. The recent movement toward
  > microservices is largely about performing this kind of decomposition. Busi‐
  > ness units control and manage their operational applications and data,
  > supported by their partnering technology team. The first principle of data
  > mesh carries out the same decomposition for analytical data, resulting in
  > the domain ownership of data.1 Each business unit takes on the
  > responsibility for analytic data ownership and management. This is because
  > the people closest to the data are best able to understand what analytical
  > data exists and how it should best be interpreted. Domain ownership results
  > in a distributed data architecture, where the data arti‐ facts—datasets,
  > code, metadata, and data policies—are maintained by their corre‐ sponding
  > domains.

- Page 108:

  > To make good decisions in the moment, analytical data must reflect business
  > truth‐ fulness. It must be as close as possible to the facts and reality of
  > the business at the moment the decision is made. This is hard to achieve
  > with two separate data planes—analytical and operational—that are far from
  > each other and connected through fragile data pipelines and intermediary
  > data teams. Data pipelines must dissolve and give way to a new way of
  > providing the analytical data and capabilities as close to the source as
  > possible.

- Page 109:

  > How can changes in the business, such as adding new features to a product,
  > introduc‐ ing new services, or modifying a business process be reflected in
  > near real time in the analytical data? Data mesh suggests closing the gap
  > and feedback loop between the two planes, through data shared as a product
  > and oriented around the domains. Data mesh connects the two planes under a
  > new structure—a network of peer-to-peer connected data products and
  > applications, a mesh that exchanges analytical data. The data mesh principle
  > of data as a product introduces a new accountability for each domain to
  > share their analytical data as a product, with the goal of delighting the
  > experience of data users by streamlining their experience in discovering,
  > understand‐ ing, trusting, and ultimately using quality data. The data as a
  > product principle is designed to address data quality and the age-old siloed
  > data problem and unhappy data users.

- Page 112:

  > A centralized data team managing a monolithic data lake or warehouse limits
  > agility, particularly as the number of sources to onboard or number of use
  > cases to serve grow. Data mesh looks carefully for centralized bottlenecks,
  > particularly where they are the focal point of a multiparty synchronization,
  > from both the architecture and human communication perspective.
  > Architecturally, these bottlenecks include data lakes and data warehouses.
  > Data mesh proposes an alternative, a peer-to-peer approach in data
  > collaboration when serving and consuming data. The architecture enables
  > consumers to directly discover and use data from the source data products.
  > For example, an ML training function or a report can directly access
  > independent data products, without the intervention of a centralized
  > architectural component such as a lake or warehouse and without the need for
  > an intermediary data (pipeline) team. Figure 7-4 demonstrates the conceptual
  > shift. Each data product provides versioned interfaces that allow
  > peer-to-peer consumption of data. The data from multiple data products can
  > be composed and aggregated into new higher-order data products.

- Page 113:

  > Data mesh moves away from tech‐ nical partitioning of data management to
  > domain-oriented partitioning. Domainoriented data products develop and
  > evolve independently of other data products. This domain-oriented
  > decomposition reduces the need for coordination to achieve an outcome. For
  > the most part, the domain-oriented data product team can take care of the
  > new data sources for their new use cases. In cases where a new use case
  > requires access to a new data product outside of the domain, the consumer
  > can make progress by utilizing the standard contracts of the new data
  > product, mocks, stubs, or synthetic data3 interfaces, until the data product
  > becomes available. This is the beauty of contracts, as they ease the
  > coordination between consumer and provider during development. Figure 7-5
  > shows the shift in reducing pipeline coordination.

- Page 114:

  > the autonomy of the domains can have undesirable conse‐ quences if not
  > checked: isolation of domains, incompatibility and disconnection of one
  > domain's data product from others, and a fragmented experience when consum‐
  > ing multiple domains' data. Data mesh governance heavily relies on the
  > automation of governance concerns for a consistent, connected, and
  > trustworthy experience using the domains' data products.

- Page 115:

  > Data mesh gives domain teams autonomy to build and maintain their data
  > products, while it places a domain-agnostic data platform in place for teams
  > to do so in a consistent and cost-effective way.

- Page 116:

  > Data mesh looks critically at the existing technology landscape and
  > reimagines the technology solutions as a data-product-developer (or user)
  > -centric platform. It intends to remove the need for data specialists and
  > enable generalist experts to develop data products. Additionally, data mesh
  > defines a set of open and standard interfaces for different affordances that
  > all data products share—discovering, requesting access, querying, serving
  > data, securing data, etc.—to enable a more collaborative ecosystem of tech‐
  > nologies. This is to reduce the cost of integration across vendors.6

- Page 117:
  > there is much more to be done beyond sharing data. We need to continuously
  > deliver repeatable and production-quality analytical and ML-based solutions.
  > But, to bootstrap, we need data sharing at scale, and that is what data mesh
  > focuses on.
