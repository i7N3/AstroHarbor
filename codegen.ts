import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://graphqlzero.almansi.me/api',
	config: {
		useTypeImports: true,
		scalars: {
			DateTime: 'string'
		}
	},
	documents: './src/**/*.gql',
	generates: {
		'src/graphql/generated/index.ts': {
			plugins: [
				'typescript',
				'typescript-operations', // generates types for queries/mutations
				'typescript-document-nodes' // generates gql`...` operations
			]
		}
	}
}

export default config
