# ⚡ FlowEntity

The Flow Entity is a special Entity.

This Entity stores all data associated with the current Flow, allowing for component functions to be chained together.  For example, the first component might set a value that the second component can then read.  &#x20;

The Flow Entity is created by a Game when a Game is initialized, and exposes the key `playerParams`.  All Components can read and write to this Entity to maintain any state associated with the current Flows execution context, such as any parameters passed in by the player or any outputs for the next component.  \
\
Conceptually, this Entity behaves as an event bus.  It enables a Component to share data, and other Components to retrieve that data.  This doesn't happen in parallel, it is very sequential, and requires the configuration of a Flow to account for the data available. &#x20;
