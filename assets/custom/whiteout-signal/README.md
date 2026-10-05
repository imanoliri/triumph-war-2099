# Whiteout Signal authored snow map

TRI-049 custom content. `tools/build-whiteout-signal.py` is the editable deterministic Pillow source (seed49049). Outputs: terrain.png, collision.png, terrain.js and geometry.json, 1024×768. No recovered terrain pixels or original installation reads. Recovered actors remain runtime visuals under assets/provenance.json attribution.

Geometry is fixed by builder rectangle envelopes: central ice ridge (290,260)-(740,470), southern ice outcrop (430,510)-(630,590), station-side ridge (795,280)-(915,390). Visual facets stay inside blocked envelopes; tracks/aprons/equipment/pad are nonblocking decoration. North is shorter/exposed, south longer with regroup apron. Runtime nests/relay/eagles/party are never baked into terrain.

Reference guidance: docs/art-kit/README.md and artist-workflow.md; recovered cliff scale/edge treatment and sprite hotspots guide proportions, not snow pixel copying. This map has its own geometry, not Split Ridge's immutable25-hotspot contract. Rebuild: `py -3 tools/build-whiteout-signal.py`. Collision proof: `node tools/check-whiteout-signal.cjs` checks every actor/object/wave point, nest birth offsets and both approaches.

Recovery 2026-10-06: the normal focused command never rewrites pressure evidence; empirical stationary recording requires explicit --record. Three pickup contacts use the real runtime collector, retain caches at full cap with feedback, and each deliver a carrier squad on clear terrain. Source/collision remain newly authored and distinct from desert maps; recovery did not regenerate assets.
