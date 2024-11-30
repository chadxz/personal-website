# My Raw Annotations and Notes from "The Art Of PostgreSQL" by Dimitri Fontaine

## 1 - Structured Query Language

> The writing date :'start' is equivalent to date '2017-02-01' and is called a
> decorated literal expression in PostgreSQL. This allows us to set the data
> type of the literal value so that the PostgreSQL query parser won't have to
> guess or infer it from the context.

> window functions that appeared in the SQL standard in 1992 but are still often
> skipped in SQL classes. The last thing executed in a SQL statement are window
> functions, well after join operations and where clauses.

> The expression extract('isodow' from date) is a standard SQL feature that
> allows computing the Day Of Week following the ISO rules. Used as a partition
> by frame clause, it allows a row to be a peer to any other row having the same
> isodow. The lag() window function can then refer to the previous peer dollars
> value when ordered by date

## 2 - Software Architecture

> At the heart of the concurrent access semantics is the concept of a
> transaction. A transaction should be atomic and isolated, the latter allowing
> for online backups of the data. Additionally, the RDBMS is tasked with
> maintaining a data set that is consistent with the business rules at all
> times. That's why database modeling and normalization tasks are so important,
> and why PostgreSQL supports an advanced set of constraints. Durable means that
> whatever happens PostgreSQL guarantees that it won't lose any committed
> change. Your data is safe. Not even an OS crash is allowed to risk your data.
> We're left with disk corruption risks, and that's why being able to carry out
> online backups is so important.

> think about PostgreSQL not as storage layer, but rather as a concurrent data
> access service. This service is capable of handling data processing. How much
> of the processing you want to implement in the SQL part of your architecture
> depends on many factors, including team size, skill set, and operational
> constraints.

## 4 - Business Logic

### Correctness

> When using multiple statements, it is necessary to setup the isolation level
> correctly. Also, the connection and transaction semantics of your code should
> be tightly controlled.

> The SQL standard defines four isolation levels and PostgreSQL implements three
> of them, leaving out dirty reads.

> by default, we are working in read committed isolation level.

> Each running transaction in a PostgreSQL system can have a different isolation
> level

> when using PostgreSQL every query always runs within a single consistent
> snapshot. The isolation level impacts reusing a snapshot from one query to the
> next.

### Stored Procedures - a Data Access API

> Since PostgreSQL 9.3 and the implementation of the lateral join technique, it
> is also possible to use the function in a join clause (By function here i.e.
> talking about a stored procedure)

> Using stored procedure allows reusing SQL code in between use cases, on the
> server side.

### Procedural Code and Stored Procedures

> The main drawback to using stored procedure is that you must know when to use
> procedural code or plain SQL with parameters.

> If you want to use stored procedures, please always write them in SQL

## 5 - A Small Application

### Top-N Artists by Genre

> The best way to implement a Top-N query in SQL is using a lateral join

## 6 - The SQL REPL - An Interactive Setup

### Intro to psql

> The process to follow to get to a complete and efficient SQL query is the same
> as when writing code: iterating from a very simple angle towards a full
> solution

Recommended `~/.psqlrc` setup:

```postgresql
\set PROMPT1 '%~%x%# '
\x auto
\set ON_ERROR_STOP on
\set ON_ERROR_ROLLBACK interactive

\pset null '¤'
\pset linestyle 'unicode'
\pset unicode_border_linestyle single
\pset unicode_column_linestyle single
\pset unicode_header_linestyle double
set intervalstyle to 'postgres_verbose';

\setenv LESS '-iMFXSx4R'
\setenv EDITOR '/Applications/Emacs.app/Contents/MacOS/bin/emacsclient -nw'
```

## 7 - SQL is Code

> The first step here is realizing that your database engine actually is part of
> your application logic.

> Now that SQL is actually code in your application's source tree, we need to
> apply the same methodology that you're used to: set a minimum level of
> expected quality thanks to common indentation rules, code comments, consistent
> naming, unit testing, and code revision systems.

### SQL Style Guidelines

> Code style is mainly about following the _principle of least astonishment_
> rule.

> we don't write all-caps code anymore: not even in SQL.

> My advice is to right align top-level SQL clauses and have them on new lines

> The SQL standard introduces noise words in the syntax, and both `inner` and
> `outer` are noise words: a `left`, `right` or `full join` is always an
> `outer join`, and a `straight join` always is an `inner join`.

> General wisdom dictates that one should avoid `natural join`s: you can (and
> will) change your query semantics by merely adding a column to or removing a
> column from a table!

> I don't suppose you pass code review when using variable names such as a1 and
> a2 in your code, so don't use them in your SQL query as aliases either.

### Comments

> The goal of code comments is to avoid ever having to second-guess the
> intentions of the author(s) of it.

> PostgreSQL's application_name facility

### Unit Tests

> SQL is code, so it needs to be tested. The general approach to unit testing
> code applies beautifully to SQL: given a known input a query should always
> return the same desired output. That allows you to change your query spelling
> at will and still check that the alternative still passes your tests. Examples
> of query rewriting would include inlining common table expressions as
> sub-queries, expanding or branches in a where clause as union all branches, or
> maybe using window function rather than complex juggling with subqueries to
> obtain the same result. What I mean here is that there are a lot of ways to
> rewrite a query while keeping the same semantics and obtaining the same
> result.

### A Closer Look

> PostgreSQL implements the application_name parameter, which you can set in the
> connection string and with the SET command within your session. It is then
> possible to have it reported in the server's logs, and it's also part of the
> system activity view pg_stat_activity. It is a good idea to be quite granular
> with this setting, going as low as the module or package level, depending on
> your programming language of choice. It's one of those settings that the main
> application should have full control of, so usually external (and internal)
> libs are not setting it.

## 8 - Indexing Strategy

> When using PostgreSQL, some indexes are necessary to ensure data consistency (
> the C in ACID). Constraints such as UNIQUE, PRIMARY KEY or EXCLUDE USING are
> only possible to implement in PostgreSQL with a backing index.

### Cost of Index Maintenance

> each index adds write costs to your DML queries: insert, update and delete now
> have to maintain the indexes too, and in a transactional way. That's why we
> have to define a global indexing strategy. Unless you have infinite IO
> bandwidth and storage capacity, it is not feasible to index everything in your
> database.

### Choosing Queries to Optimize

> when you want to make a query faster and you see that its explain plan is
> lacking index support, think about the query in terms of SLA in your
> application. Does this query need to run as fast as possible, even when it
> means that you now have to maintain more indexes?

> The GIN access method is the foundation for the PostgreSQL Full Text Search
> support.

> The first rule of optimization in SQL, as is true for code in general, is to
> answer the following question:
>
> > Do I really need to do any of that?
>
> The very best query optimization technique consists of not having to execute
> the query at all.

### Adding Indexes

> Not every query needs to be that fast, and the requirements are mostly user
> defined. That said, a general system-wide analysis can be achieved thanks to
> the PostgreSQL extension pg_stat_statements.

> You can begin your indexing needs analysis by listing every query that
> averages out to more than 10 milliseconds, or some other sensible threshold
> for your application.

> check for time spent doing sequential scans of your data, with a filter step,
> as that's the part that a proper index might be able to optimize.

> Remember Amdahl's law when optimizing any system: if some step takes 10% of
> the run time, then the best optimization you can reach from dealing with this
> step is 10% less, and usually that's by removing the step entirely.

> Query optimisation is a large topic that is not covered in this book

## 9 - An Interview with Yohann Gabory

> if you are ready to lose some data then your data has no value. If your data
> has no value then there is a big chance that your app has no value either.

> as a grown-up I know two things. Santa and RDBMS agnosticism do not really
> exist.

> The idea of using SQLite in development and PostgreSQL in production leads
> only to one thing: you will use the features of SQLite everywhere and you will
> not be able to use the PostgreSQL specific features. The only way to be purely
> agnostic is to use only the features all the proposed RDMS provides. But think
> again. Do you want to drive your race car like a tractor?

## IV - SQL Toolbox

> Here's some good advice I received years and years ago, and it still applies
> to this day: when you're struggling to write a SQL query, first write down a
> single sentence - in your native language - that perfectly describes what
> you're trying to achieve. As soon as you can do that, then writing the SQL is
> going to be easier.

## 11 - Structured Query Language

> any extra layer on top of SQL is only there to produce SQL for you, which
> means you have even less control over what plan is going to be executed.

## 12 - Queries, DML, DDL, TCL, DCL

> DML stands for data manipulation language and it covers insert, update and
> delete statements, which are used to input data into the system.

> DDL stands for data definition language and it covers create, alter and drop
> statements, which are used to define on-disk data structures where to hold the
> data, and also their constraints and indexes - the things we refer to with the
> terms of SQL objects.

> TCL stands for transaction control language and includes begin and commit
> statements, and also rollback, start transaction and set transaction commands.
> It also includes the less well-known savepoint, release savepoint, and
> rollback to savepoint commands, and let's not forget about the two-phase
> commit protocol with prepare commit, commit prepared and rollback prepared
> commands.

## 13 - Select, From, Where

> the SQL standard allows us to use this alternative, which is even more
> practical: table races limit 1;

### Projection (output) - Select

> The SQL select clause introduces the list of output columns. This is the list
> of data that we are going to send back to the client application, so it's
> quite important: the only reason the server is executing any query is to
> return a result set where each row presents the list of columns specified in
> the select clause. This is called a projection.

> it is usually frowned upon to use either the infamous select star notation or
> the classic I don't know what I'm doing behavior of some object relational
> mappers when they insist on always fully hydrating the application objects,
> just in case.

> There's another reason to refrain from using the select star notation in
> application's code: if you ever change the source relation definitions, then
> the same query now has a different result set data structure, and you might
> have to reflect that change in the application's in-memory data structures.

### Restrictions - Where

> Remember that a where clause is a filter. The not exists clause is filtering
> based on rows that are returned by the subquery. To pass the filter, just
> return anything, PostgreSQL will not even look at what is selected in the
> subquery, it will only take into account the fact that a row was returned.

## 14 - Order By, Limit, No Offset

### kNN Ordering and GiST Indexes

> The point datatype is a very useful PostgreSQL addition. In our query here,
> the points have been computed from the raw data in the database. For a proper
> PostgreSQL experience, we can have a location column of point type in our
> circuits table and index it using GiST

> By default, the distance operator <-> is defined only for geometric data types
> in PostgreSQL. Some extensions such as pg_trgm add to that list so that you
> may benefit from a kNN index lookup in other situations, such as in queries
> using the like operator, or even the regular expression operator ~.

### Top-N Sorts: Limit

`select rank() over(partition by decade order by wins desc) as rank`

> a lateral join. This form of join allows one to write a subquery that runs in
> a loop over a data set. Here we loop over the decades and for each decade our
> lateral subquery finds the top three winners.

### No Offset, and how to implement pagination

> The SQL standard offers a fetch command instead of the limit and offset
> variant that we have in PostgreSQL. In any case, using the offset clause is
> very bad for your query performances, so we advise against it
>
> Please take the time to read Markus Winand's [Paging Through Results][], as I
> won't explain it better than he does. Also, never use offset again!

[Paging Through Results]:
  https://use-the-index-luke.com/sql/partial-results/fetch-next-page

## 15 - Group by, Having, With, Union All

### Grouping Sets

> A restriction with classic aggregates is that you can only run them through a
> single group definition at a time. In some cases, you want to be able to
> compute aggregates for several groups in parallel. For those cases, SQL
> provides the grouping sets feature.

> Two other kinds of grouping sets are included in order to simplify writing
> queries. They are only syntactic sugarcoating on top of the previous
> capabilities. The rollup clause generates permutations for each column of the
> grouping sets, one after the other. That's useful mainly for hierarchical data
> sets

> Another kind of grouping sets clause shortcut is named cube, which extends to
> all permutations available, including partial ones

### Common Table Expressions: With

```postgresql
select count(*) filter (where status = 'Accident') as accidents
```

> Common table expression is the full name of the with clause that you see in
> effect in the query. It allows us to run a subquery as a prologue, and then
> refer to its result set like any other relation in the from clause of the main
> query.

> in SQL it's not possible to compute an aggregate over an aggregate:
> `ERROR: aggregate function calls cannot be nested`. Thus the way to have the
> sum of points and the maximum value for the sum of points in the same query is
> by using a two-stages pipeline, which is what we are doing.

## 16 - Understanding Nulls

### Three-Valued Logic

> We can think of null as meaning I don't know what this is rather than no value
> here. Say you have in A (left hand) something (hidden) that you don't know
> what it is and in B (right hand) something (hidden) that you don't know what
> it is. You're asked if A and B are the same thing. Well, you can't know that,
> can you? So in SQL null = null returns null, which is the proper answer to the
> question

> That's why we have other SQL operators to work with data that might be null:
> they are is distinct from and is not distinct from. Those two operators not
> only have a very long name, they also pretend that null is the same thing as
> null. So if you want to pretend that SQL doesn't implement three-valued logic
> you can use those operators and forget about Boolean comparisons returning
> null.

> null values can be created by the queries themselves. There's basically no way
> to escape from having to deal with null values, so your application must be
> prepared for them and moreover understand what to do with them.

### Using Null in Applications

> keep in mind the three-valued logic semantics when you write SQL, and remember
> to use `where foo is null` if that's what you mean, rather than the erroneous
> `where foo = null`, because `null = null` is `null` and then it won't be
> selected in your resultset

## Understanding Window Functions

> There was SQL before window functions and there is SQL after window functions:
> that's how powerful this tool is! The whole idea behind window functions is to
> allow you to process several values of the result set at a time: you see
> through the window some peer rows and you are able to compute a single output
> value from them, much like when using an aggregate function.

### Windows and Frames

```postgresql
select x,
       array_agg(x) over (order by x
           rows between unbounded preceding
               and current row)
from generate_series(1, 3) as t(x);
```

> Did you know you could compute both the total sum of a column and the ratio of
> the current value compared to the total within a single SQL query? That's the
> breakthrough we're talking about now with window functions.

### Available Window Functions

> Any and all aggregate function you already know can be used against a window
> frame rather than a grouping clause, so you can already start to use sum, min,
> max, count, avg, and the other that you're already used to using.

### When to Use Window Functions

> The real magic of what are called window functions is actually the frame of
> data they can see when using the `over ()` clause. This frame is specified
> thanks to the `partition by` and `order by` clauses. You need to remember that
> the windowing clauses are always considered last in the query, meaning after
> the where clause. In any frame you can only see rows that have been selected
> for output: e.g. it's not directly possible to compute a percentage of values
> that you don't want to display. You would need to use a subquery in that case.
> Use window functions whenever you want to compute values for each row of the
> result set and those computations depend on other rows within the same result
> set. A classic example is a marketing analysis of weekly results: you
> typically output both each day's gross sales and the variation with the same
> day in comparison to the previous week.

# 18 - Understanding Relations and Joins

> The result of the `from` list is an intermediate virtual table that can then
> be subject to transformations by the `where`, `group by`, and `having` causes
> and is finally the result of the overall table expression.

> a relation is a set of data all having a common set of properties (table =
> relation, but relation isn't always a table)

## Sql Join Types

> The nature of a join is to build a new relation from a pair of existing ones.

> - `Inner join`s are useful when you want to only keep rows that satisfy the
>   join condition for both involved relation.
>
> - `Outer join`s are useful when you want to keep a reference relation's
>   dataset no matter what and enrich it with the dataset from the other
>   relation when the join condition is satisfied. The relation of which you
>   want to keep all the rows is pointed to in the name of the outer join, so
>   it's written on the left-hand side in a `left join` and on the right-hand
>   side in a `right join`. When the join condition is not satisfied, it means
>   you keep some known data and must fill in the result relation with data that
>   doesn't exist, so that's when `null` is very useful, and also why `null` is
>   a member of every SQL data type (including the Boolean data type),
>
> - `Full outer join`s is a special case of an outer join where you want to keep
>   all the rows in the dataset, whether they satisfy the join condition or not.
>
> - `Lateral join`s introduce the capability for the join condition to be
>   _pushed down_ into the relation on the right, allowing for new semantics
>   such as top-N queries, thanks to being able to use `limit` in a lateral
>   subquery.

> A relation here is a bag of rows that all share a common relation data type
> definition, known at query planning time.

# 19 - An Interview with Markus Winand

> Markus Winand is the author of the very famous book "SQL Performance
> explained" and he also provides both http://use-the-index-luke.com and
> http://modern-sql.com. Markus is a master of the SQL standard and he is a
> wizard in terms of how to use SQL to enable fast application delivery and
> solid run-time performances!

> I believe that portability is not only about the code — it is also about the
> people. I'd say it is even more about the people. If you use standard SQL by
> default and only revert to proprietary syntax if needed, the SQL statements
> will be easier for other people to under-stand, especially people used to
> another database. On the scale of the whole industry it means that bringing
> new personnel on board involves less friction. Even from the personal
> viewpoint of a single developer, it has a big benefit: if you are used to
> writing standard SQL then the chances increase that you can write SQL that
> works on many databases. This makes you more valuable in the job market.

> For DDL, I don't even aim for portability in the first place

# 21 - Some Relational Theory

RDBMS can provide your application:

> - A service to access your data and run transactions
> - A common API to guarantee consistency in between several application bases
> - A transport mechanism to exchange data with the database service.

> For \[...] applications to work well together and respect the same set of
> business rules, we need a core system that \[guarantees] overall consistency.
> That is the main problem that a relational database management system is meant
> to solve, and that's why the relational model is so generic.

## Attribute Values, Data Domains and Data Types

> a tuple is a list of T attributes, and a relation is a list of tuples that all
> share the same list of attributes domains: names and data type. So the basics
> of the relational model is to establish consistency within your data set

```postgresql
select date '2010-02-29';
-- ERROR: date/time field value out of range: "2010-02-29"
```

# 22 - PostgreSQL Data Types

> this input syntax \[the code above] is named a _decorated literal_: we
> decorate the literal with its data type so that PostgreSQL doesn't have to
> guess what it is.

## Boolean

> The main thing about Booleans is the set of operators to use with them:
>
> - The = doesn't work as you think it would
> - Use is to test against literal true, false or null rather than =
> - Remember to use the is distinct from and is not distinct from operators when
>   you need them,
> - Booleans can be aggregated thanks to `bool_and` and `bool_or`

## Character and Text

> Note that PostgreSQL also supports indexing for regular expressions thanks to
> its trigram extension: `pg_trgm`.

## Server Encoding and Client Encoding

> The `SQL_ASCII` encoding is a trap you need to avoid falling into. To know
> which encoding your database is using, run the psql command `\l`

> `UTF8` is the best choice these days

> Never use `SOL_ASCII` \[...] Migrating away from `SQL_ASCII` to a proper
> encoding such as `UTF8` is possible but lossy and complex.

> you can ask PostgreSQL to convert all and any data on the fly between the
> server-side encoding and your favorite client-side encoding, thanks to the
> client encoding setting.

> The combinatorial explosion of internal operators and support functions for
> comparing numbers is the reason why the PostgreSQL project has chosen to have
> a minimum number of numeric data types: the impacts of adding another one is
> huge in terms of query planning time and internal data structure sizing.
> That's why there are no unsigned numeric data types in PostgreSQL.

## Floating Point Numbers

> Please take some time to read
> [What Every Programmer Should Know About Floating-Point Arithmetic](https://floating-point-gui.de)
> before considering any serious use of floating point numbers.

> In short, understand what you're doing when using `real` or `double` precision
> data types, and never use them to deal with money. Use either `numeric` which
> provides arbitrary precision or an `integer`-based representation of the
> money.

## Sequences and the Serial Pseudo Data Type

> The `sequence` SQL object is covered by the SQL standard and documented in the
> [create sequence][] manual entry for PostgreSQL. This object is the only one
> in SQL with a non-transactional behavior. Of course, that's on purpose, so
> that multiple sessions can get the next number from the sequence concurrently,
> without having to then wait until `commit;` to decide if they can keep their
> sequence number.

[create sequence]:
  https://www.postgresql.org/docs/current/sql-createsequence.html

## Universally Unique Identifier: UUID

> PostgreSQL implements support for UUID, both for storing and processing them,
> and also with the `uuid-ossp` extension, for generating them.

> Even if you generate UUIDs from your application, managing them as a proper
> UUID in PostgreSQL is a good idea, as PostgreSQL actually stores the binary
> value of the UUID on 128 bits (or 16 bytes) rather than way more when storing
> the text representation of a UUID

## Bytea and Bitstring

> Binary columns are limited to about GB in size

> it's not always the best solution around.

## Date/Time and Time Zones

> Handling dates and time and time zones is a very complex matter, and on this
> topic, you can read Erik Naggum's piece [The Long, Painful History of Time][]

[The Long, Painful History of Time]: http://naggum.no/lugm-time.html

> always use timestamps WITH time zones.

> For timestamp with time zone, the internally stored value is always in UTC
> (Universal Coordinated Time, traditionally known as Greenwich Mean Time, GMT).
> An input value that has an explicit time zone specified is converted to UTC
> using the appropriate offset for that time zone. If no time zone is stated in
> the input string, then it is assumed to be in the time zone indicated by the
> system's TimeZone parameter, and is converted to UTC using the offset for the
> timezone zone.

> the `now()` function always returns the same timestamp within a single
> transaction. If you want to see the clock running while in a transaction, use
> the `clock_timestamp()` function instead.

> \[a timestamp without a timezone] makes it impossible to compare \[two]
> entries and realize they actually happened at exactly the same time.

```postgresql
where project = 'postgresql'
  and ats >= date :'day'
  and ats < date :'day' + interval '1 day'
order by ats;
```

> It's tempting to use the `between` SQL operator, but we would then have to
> remember that between includes both its lower and upper bound and we would
> then have to compute the upper bound as the very last instant of the day.
> Using explicit greater than or equal and less than operators makes it possible
> to always compute the very first time of the day, which is easier, and well
> supported by PostgreSQL. Also, using explicit bound checks allows us to use a
> single date literal in the query

> It makes sense \[to process dates in SQL] when the SQL logic or filtering you
> want to implement depends on the result of the processing (eg. grouping by
> week).

## Ranges

```postgresql
create table rates
(
    currency text,
    validity daterange,
    rate     numeric,

    exclude using gist (currency with =,
        validity with &&)
);

insert into rates(currency, validity, rate)
select currency,
       daterange(date,
                 lead(date) over (partition by currency
                     order by date),
                 '[)'
       ) as validity,
       rate
from raw.rates
order by date;
```

> The rates table registers the rate value for a currency and a validity period,
> and uses an [exclusion constraint][] that guarantees non-overlapping validity
> periods for any given currency

[exclusion constraint]:
  https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-EXCLUDE

The `lead()` function is also interesting:
https://neon.tech/postgresql/postgresql-window-function/postgresql-lead-function

> By default, GiST in PostgreSQL doesn't support one-dimensional data types that
> are meant to be covered by B-tree indexes. With exclusion constraints though,
> it's very interesting to extend GiST support for one-dimensional data types,
> and so we install the `btree_gist` extension, provided in PostgreSQL contrib
> package.

```postgresql
select rate
from rates
where currency = 'Euro'
  and validity @> date '2017-05-18';
```

> The operator `@>` reads _contains_, and PostgreSQL uses the exclusion
> constraint's index to solve that query efficiently

# 23 - Denormalized Data Types

## Arrays

> \[...] a specialized GIN index. This index access method allows PostgreSQL to
> index the contents of the arrays \[...] rather than each array as an opaque
> value.

> PostgreSQL arrays are very powerful, and [GIN][] indexing support makes them
> efficient to work with. Nonetheless, it's still not so efficient that you
> would replace a lookup table with an array in situations where you do a lot of
> lookups, though.
>
> Also, some PostgreSQL array functions show a quadratic behavior: looping over
> array elements really is inefficient, so learn to use `unnest()` instead, and
> filter elements with a `where` clause. If you see yourself doing that a lot,
> it might be a good sign that you really needed a lookup table!

[GIN]: https://www.postgresql.org/docs/current/gin.html

## Composite Types

> PostgreSQL tables are made of tuples with a known type. It is possible to
> manage that type separately from the main table:

```postgresql
begin;

create type rate_t as
(
    currency text,
    validity daterange,
    value    numeric
);

create table rate of rate_t
(
    exclude using gist (currency with =,
        validity with &&)
);

insert into rate(currency, validity, value)
select currency, validity, rate
from rates;

commit;
```

## JSON

> \[Using an `extra` JSONB column] works well until the application's code is
> querying the `extra` column in every situation because some important data is
> found only there. At this point, it's worth promoting parts of the extra field
> content into proper PostgreSQL attributes in your relational schema.

## Enum

> This data type has been added to PostgreSQL in order to make it easier to
> support migrations from MySQL. Proper relational design would use a reference
> table and a foreign key instead

# 25 - An Interview with Grégoire Hubert

> Marrying application object-oriented design with relational is not easy \[...]
> since SQL uses a projection (the list of fields in a `select`) to transform
> the returned type, \[so] entities have to be flexible objects. They have to be
> database ignorant. This is the complete opposite of the Active Record design
> pattern.

# VI - Data Modeling

# 27 - Tooling for Database Modeling

## How to Write a Database Model

> In PostgreSQL, each "database" is an isolated environment. A connection string
> must pick a target database, and it's not possible for one database to
> interact with objects from another one, because catalogs are kept separated.

> If you want to be able to `join` data in between your sandbox and your
> application models, use a `schema` instead.

## Modeling Example

```postgresql
drop schema cascade
```

# 28 - Normalization

> [Database normalization][] is the process of organizing the columns
> (attributes) and tables (relations) of a relational database to reduce data
> redundancy and improve data integrity. Normalization is also the process of
> simplifying the design of a database so that it achieves the optimal
> structure.

[Database normalization]:
  https://en.wikipedia.org/wiki/Database_normalization/Normal_forms

## Data Structures and Algorithms

> In [Basics of the Unix Philosophy][] we read some design principles of the
> Unix operating system that apply almost verbatim to the problem space of
> database modeling:
>
> 1. **Rule of Modularity** - Write simple parts connected by clean interfaces.
> 2. **Rule of Clarity** - Clarity is better than cleverness.
> 3. **Rule of Composition** - Design programs to be connected to other
>    programs.
> 4. **Rule of Separation** - Separate policy from mechanism; separate
>    interfaces from engines.
> 5. **Rule of Simplicity** - Design for simplicity; add complexity only where
>    you must.
> 6. **Rule of Parsimony** - Write a big program only when it is clear by
>    demonstration that nothing else will do.
> 7. **Rule of Transparency** - Design for visibility to make inspection and
>    debugging easier.
> 8. **Rule of Robustness** - Robustness is the child of transparency and
>    simplicity.
> 9. **Rule of Representation** - Fold knowledge into data so program logic can
>    be stupid and robust.
> 10. **Rule of Least Surprise** - In interface design, always do the least
>     surprising thing.
> 11. **Rule of Silence** - When a program has nothing surprising to say, it
>     should say nothing.
> 12. **Rule of Repair** - When you must fail, fail noisily and as soon as
>     possible.
> 13. **Rule of Economy** - Programmer time is expensive; conserve it in
>     preference to machine time.
> 14. **Rule of Generation** - Avoid hand-hacking; write programs to write
>     programs when you can.
> 15. **Rule of Optimization** - Prototype before polishing. Get it working
>     before you optimize it.
> 16. **Rule of Diversity** - Distrust all claims for "one true way".
> 17. **Rule of Extensibility** - Design for the future, because it will be here
>     sooner than you think.

[Basics of the Unix Philosophy]:
  http://www.catb.org/esr/writings/taoup/html/ch01s06.html

> Anyone reading your database schema should instantly understand your business
> model.

https://en.wikipedia.org/wiki/Database_normalization

## Modeling an Address field

> The point of a proper data model is to make it easy for the application to
> process the information it needs, and to ensure global consistency for the
> information.

## Primary keys

> Primary keys are a database constraint allowing us to implement the first and
> second normal forms.

## Surrogate Keys

> The reason why we have primary key is to avoid duplicate entries in the data
> set. As soon as a primary key is defined on an automatically generated column,
> which is arguably not really part of the data set, then we open the gates for
> violation of the first normal form.

> the artificially generated key is named a "surrogate key" because it is a
> substitute for a natural key. A natural key would allow preventing duplicate
> entries in our data set.

```postgresql
create table sandboxpk.article
(
    id       bigserial primary key,
    category integer     not null references sandbox.category (id),
    pubdate  timestamptz not null,
    title    text        not null,
    content  text,

    unique (category, pubdate, title)
);
```

In the above query, the `id` is easy to reference and the unique constraint
provides a strong 1NF guarantee.

## Check Constraints and Domains

I thought this was really cool!

> When the data type allows more values than your application or business model,
> SQL allows you to restrict the values using either a _domain definition_ or a
> _check constraint_. The domain definition applies a check constraint to a data
> type definition. Here's the example from the PostgreSQL documentation chapter
> about check constraints:

```postgresql
create table products
(
    product_no integer,
    name       text,
    price      numeric check (price > 0)
);
```

> The check constraint can also reference several columns of the same table at
> once, if that's required:

```postgresql
create table products
(
    product_no       integer,
    name             text,
    price            numeric CHECK (price > 0),
    discounted_price numeric,
    check (discounted_price > 0 AND price > discounted_price)
);
```

> And here's how to define a new data domain as per the PostgreSQL documentation
> for the create domain SQL command:

```postgresql
create domain us_postal_code as text
    check (
        value ~ '^\d{5}$'
            or
        value ~ '^\d{5}-\d{4}$'
        )
```

# 29 - Practical Use Case: Geonames

I've never seen a multi-count before, or `filter`!

## Geolocation Data

```postgresql
select count(*)                                      as all,
       count(*) filter (where country_code is null)  as no_country,
       count(*) filter (where admin1_code is null)   as no_region,
       count(*) filter (where admin2_code is null)   as no_district,
       count(*) filter (where feature_class is null) as no_class,
       count(*) filter (where feature_code is null)  as no_feat
from raw.geonames;
```

# 30 - Modelization Anti-Patterns

## Entity Attribute Values

> It might be that the business case your application is solving actually has an
> attribute volatility problem to solve. In that case, consider having as solid
> a model as possible and use jsonb columns as extension points.

## Multiple Values per Column

> An anti-pattern that fails to comply with \[1NF] rules means having a
> multi-valued field in a database schema:

```postgresql
create table tweet
(
    id      bigint primary key,
    date    timestamptz,
    message text,
    tags    text -- <-- anti-pattern
);
```

> Database modeling has a non-trivial impact on query performance and as such is
> part of making attempts at upping efficiency. Using a CSV formatted attribute
> rather than two additional tables looks like optimization, but actually it
> will make just about everything worse: debugging, maintenance, search,
> statistics, normalization, and other use cases.

## UUIDs

> sequences and their usage as a default value for synthetic keys offer a
> guarantee against collisions.
>
> UUIDs on the other hand rely on a way to produce random numbers in a 128 bits
> space that offers a strong theoretical guarantee against collision. You might
> have to retry producing a number, though very rarely.

# 31 - Denormalization

> The process of denormalization consists of relaxing the normalization rules to
> reach an acceptable trade-off in terms of data quality and data maintenance.

## Premature Optimization

> Only use denormalization techniques when you've made a strong case for needing
> them.

## Partitioning

> While partitioning isn't denormalization as such, the limits of the PostgreSQL
> implementation makes it valuable to include the technique in this section.
> Quoting the PostgreSQL documentation:
>
> - There is no facility available to create the matching indexes on all
>   partitions automatically. Indexes must be added to each partition with
>   separate com-mands. This also means that there is no way to create a primary
>   key, unique constraint, or exclusion constraint spanning all partitions; it
>   is only possible to constrain each leaf partition individually.
>
> - Since primary keys are not supported on partitioned tables, foreign keys
>   referencing partitioned tables are not supported, nor are foreign key
>   references from a partitioned table to some other table.
>
> - Using the `on conflict` clause with partitioned tables will cause an error,
>   because unique or exclusion constraints can only be created on individual
>   par-titions. There is no support for enforcing uniqueness (or an exclusion
>   con-straint) across an entire partitioning hierarchy.
>
> - An `update` that causes a row to move from one partition to another fails,
>   because the new value of the row fails to satisfy the implicit partition
>   constraint of the original partition.
>
> - Row triggers, if necessary, must be defined on individual partitions, not
>   the partitioned table.
>
> So when using _partitioning_ in PostgreSQL 10, we lose the ability to reach
> even the first normal form by the lack of _covering_ primary key. Then we lose
> the ability to maintain a reference to the partitioned table with a _foreign
> key_.
>
> Before partitioning any table in PostgreSQL, including PostgreSQL 10, as with
> any other denormalization technique (covered here or not), please do your
> homework: check that it's really not possible to sustain the application's
> workload with a normalized model.

citus data I think is a way of improving this situation, but overall this looks
pretty rough for PostgreSQL.

# 32 - Not Only SQL

## Scaling Out

> PostgreSQL native scale-out does not exist yet. Commercial and open-source —
> both at the same time — extensions and forks are available that solve this
> problem such as [Postgres-BDR][] or [Citus][] from citusdata.

[Postgres-BDR]: https://www.enterprisedb.com/docs/pgd/4/bdr/
[Citus]: https://github.com/citusdata/citus

# 35 - Insert, Update, Delete

> The three commands `insert`, `update`, and `delete` have something in common:
> they accept a `returning` clause. This allows the DML command to return a
> result set to the application with the same protocol as the `select` clause,
> both are a `projection`.

## Insert Into

> The SQL standard `values` clause is usable anywhere `select` is expected

## Insert Into ... Select

> The `insert` statement can also use a query as a data source.

In this query, the `with fairies as` is a "Common Table Expression",
interesting!

```postgresql
with fairies as
         (select userid
          from tweet.users
          where bio ~ '#Fairies')
insert
into tweet.follower (follower, following)
select fairies.userid as follower,
       users.userid   as following
from fairies
         cross join tweet.users
where users.bio ~ 'of the fairies';
```

## Update

> always use an explicit transaction block so that you can check what happened
> and issue a rollback; when it's not what you thought.

## Delete

> As with the update statement the most important part of the delete statement
> has to do with concurrency. Again, the main reason why we use a RDBMS is so
> that we don't have to solve the concurrency problems in our application's
> code, where instead we can focus on delivering an improved user experience.
>
> The actual removal of on-disk tuples happens with vacuum

This is an example of an _anti-join_ 👇. Note the `where not exists`. He's also
a big fan of using a common table expression to do mutations with a `returning`,
then doing a select on that to show details about what was deleted.

```postgresql
with deleted_rows as (
    delete
        from tweet.users
            where not exists
                (select 1
                 from tweet.message
                 where userid = users.userid)
            returning *)
select min(userid),
       max(userid),
       count(*),
       array_agg(uname)
from deleted_rows;
```

> It is also possible to use a _join condition_ when deleting rows. It is
> written `using`

# 36 - Isolation and Locking

> it's best to rely on existing solutions for handling concurrency rather than
> rolling your own.

## Transactions and Isolation

> The SQL standard defines four levels of transaction isolation. The most strict
> is _Serializable_, which is defined by the standard in a paragraph which says
> that any concurrent execution of a set of _Serializable_ transactions is
> guaranteed to produce the same effect as running them one at a time in some
> order. The other three levels are defined in terms of phenomena, resulting
> from interaction between concurrent transactions, which must _not_ occur at
> each level.

> There are four isolation levels defined by the standard: _read uncommitted_,
> _read committed_, _repeatable read_, and _serializable_. PostgreSQL doesn't
> implement _read uncommitted_, which allows dirty reads, and instead defaults
> to _read committed_.
>
> The definition of those isolation levels says that _read committed_ disallows
> dirty read anomalies, _repeatable read_ disallows dirty read and nonrepeatable
> read, and _serializable_ disallows all anomalies.

## Modeling for Concurrency

> `insert` has no concurrency because it targets a row that doesn't exist yet.

## Putting Concurrency to the Test

> If you know that your application has to scale, think about how to avoid
> concurrent activity that competes against a single shared resource.

> it's impossible for our users to know for sure how many retweets have been
> made so we can implement a cache with eventual consistency properties.

# 37 - Computing and Caching in SQL

## Views

> Views allow integrating server-side computations in the definition of a
> relation. The computing still happens dynamically at query time and is made
> transparent to the client. When using a view, there's no problem with cache
> invalidation, because nothing gets cached away.

> The view hides the complexity of how to obtain the counters from the schema.

## Materialized Views

To recompute a materialized view:

```postgresql
refresh materialized view concurrently twache.message;
```

# 38 - Triggers

> The execution of the procedure is always taken as a part of the transaction

# 41 - An Interview with Kris Jenkins

> The reason Clojure exists is to bring some clarity to how we deal with the
> effect of time in programming.

> By way of contrast, I think one of the downsides of test-driven development is
> in some corners it's encouraged people to think of their data as a kind of
> black box, where only the way it's used today gets to drive the data
> implementation. Too often I've seen that lead to big painful rewrites when the
> data outgrows the features. **The mindset of making data primary, and today's
> use-case secondary, is invaluable if you want a system to grow well.**

# VIII - PostgreSQL Extensions

# 43 - Auditing Changes with hstore

## From hstore back to a regular record

> The `hstore` extension is very useful, even with JSON support in current
> versions of PostgreSQL. The ability to cast from and to a record is unique to
> this extension, and its difference operator has no equivalent in the JSON
> feature set.

https://pgloader.io

# 45 - Using Trigrams for Typos

> The use of trigrams is often complementary to full text search. With trigrams
> we can implement typing correction suggestions or index `like` and POSIX
> Regular Expressions searches.

https://www.postgresql.org/docs/current/functions-matching.html

## Trigrams, Similarity and Searches

```postgresql
\index(Operators!%}
select
  artist, title
from lastfm.track
where title % 'love'
group by artist, title
order by title <-> 'love'
limit 10;
```

> This query introduces several new operators from the `pg_trgm` extension:
>
> - The operator `%` reads _similar to_ and involves comparing trigrams of both
>   its left and right arguments
> - The operator `<->` computes the "distance" between the arguments, i.e. one
>   minus the similarity() value.

## Complete and Suggest Song Titles

A query like this can be used to provide search suggestions:

```postgresql
select artist, title
from lastfm.track
where title %> 'peas'
order by title <-> 'peas'
limit 5;
```

# 50 - Counting Distinct Users with HyperLogLog

> If you've been following along at home and keeping up with the newer
> statistics developments, you might have heard about this new state of the art
> cardinality estimation algorithm called HyperLogLog.

https://research.google.com/pubs/pub40671.html

https://github.com/citusdata/postgresql-hll

There are a few pieces to this query that I find interesting, but over my head:

- `skip locked` to omit a row from the current transaction without any locking
  or waiting
- `hll_hash_text(ipaddr::text) as visitors` to hash the IP address
- `hll_add_agg(visitors) as visitors` to aggregate the hashes
- `hll_union(uniques.visitors, excluded.visitors)` to union the hashes
- `# visitors as uniques` using the unary operator `#` to get the "estimated
  cardinality" of the HyperLogLog data structure
- The concept of a _writable common table expression_ which I'd need to learn
  more about

```postgresql
with new_visitors as (
    delete from tweet.visitor
        where id = any (select id
                        from tweet.visitor
                        order by datetime, messageid
                            for update
                                skip locked
                        limit 1000)
        returning messageid,
            cast(datetime as date) as date, hll_hash_text(ipaddr::text) as visitors),
     new_visitor_groups as
         (select messageid, date, hll_add_agg(visitors) as visitors
          from new_visitors
          group by messageid, date)
insert
into tweet.uniques
select messageid, date, visitors
from new_visitor_groups
on conflict (messageid, date)
    do update set visitors = hll_union(uniques.visitors, excluded.visitors)
where uniques.messageid = excluded.messageid
  and uniques.date = excluded.date
returning messageid, date, # visitors as uniques;
```
