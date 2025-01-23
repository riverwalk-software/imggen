type MapperFunction<A> = (value: A, key: string, index: number) => A;

export default <A>(o: Record<string, A>, f: MapperFunction<A>): Record<string, A> =>
	Object.fromEntries(Object.entries(o).map(([k, v], i) => [k, f(v, k, i)]));
