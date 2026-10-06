# District Twelve

Status: implemented for TRI-053 review; approved bounded task supersedes earlier draft gate. Planet: [Crown capital-world](../planets/capital-world.md). Dossier proposals remain unchanged.

Local Metropolitan Guard holds a connected guard post and two transit streets until expedition relief arrives. Existing commanders, soldiers, robot, bugs, nests, carrier eagles and aircraft express the local-command identity. Evacuation is briefing context only; no civilian actors.

Activate north-transit (880,170) and south-transit (880,600), hold 120 simulation seconds, wait for scheduled aircraft relief and all pending support/drop completion, exhaust or destroy finite nests and clear every living bug and finite wave. Last noncommander loss fails immediately, even with relief inbound. No timeout. Empty live nests do not gate completion after their finite birth budget expires; destroying a nest cancels unused births.

New deterministic capital terrain contains west connected rooms with two broad wall passages, a sheltered west circuit, north/south transit streets, central street and east plaza connector. Two clear enemy approaches from both transit streets; all relief targets (210,385)/(258,385)/(306,385) connect to guard and plaza. Existing aircraft arrive once at70s from the north and drop one existing commando each. At full infantry cap they wait/retry while preserving drop reservations.

Five explicit profiles reuse four commanders, one robot, six initial bugs. Soldiers10/10/8/6/4; four nest budgets4/5/7/10/13 each at7/6/4.5/3/2.4s; waves26/36/46/62/78. First wave24/20/16/12/10s, second50s, final85s. Finite pressure rises while starting infantry decreases. Two yellow carrier eagles at(150,170)/(150,600), no refill; full cap retains pickup. Plasma at(210,385). Autonomous AI may collect supply in probes.

No new units/abilities, rooftops, building destruction, environmental damage, campaign persistence or faction mechanics. Geometry/art/runtime contract and provenance: [authored map](../../../../assets/custom/district-twelve/README.md). Dedicated regression covers physical circuits/terminal orders, births/waves/caps, actual eagles and relief landings, hold/victory/loss and reset/isolation; browser and human challenge evidence stay separate.
