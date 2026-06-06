# Contributing to EchoVerse

Thanks for contributing.

## Development Setup

1. Fork the repository.
2. Clone your fork.
3. Install dependencies:

```bash
npm install
```

4. Start local development:

```bash
npm run dev
```

## Contribution Workflow

1. Create a feature branch from `main`.
2. Keep pull requests focused and small.
3. Include tests or manual validation notes.
4. Run checks before opening a PR:

```bash
npm run lint
npm run build
```

## Coding Guidelines

- Use TypeScript types for all new state models and service contracts.
- Prefer reusable components over one-off inline implementations.
- Keep UI accessible: labels, semantic controls, keyboard support.
- Keep animations lightweight and avoid unnecessary runtime overhead.

## Pull Request Checklist

- [ ] Feature works on desktop and mobile layouts
- [ ] Lint passes
- [ ] Build passes
- [ ] Documentation updated when behavior changes
- [ ] No secrets or private keys committed

## Reporting Issues

Please include:

- Browser and version
- Reproduction steps
- Expected behavior
- Actual behavior
- Console errors (if any)
