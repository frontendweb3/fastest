## Description:

Build, customize, review, debug, migrate, and optimize Ghost CMS Handlebars themes.

This skill is ready for commercial/non-commercial use.

## Publisher:

[frontendweb](https://clawhub.ai/user/frontendweb)

### License/Terms of Use:

MIT-0

## Use Case:

Developers and site teams use this skill to have an AI assistant build, customize, review, debug, migrate, and optimize Ghost CMS themes. It supports Ghost Handlebars templates and partials, package.json theme settings, routes.yaml, memberships, Portal, comments, search, accessibility, SEO, and GScan-oriented handoff.

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: The skill may inspect and modify Ghost theme files while implementing or reviewing theme work.

Mitigation: Review proposed file changes and keep changes scoped to the requested Ghost theme before publishing.

Risk: The skill may suggest or run Ghost theme validation or build commands.

Mitigation: Run commands in the intended theme workspace and confirm GScan or build output before relying on pass or fail claims.

## Reference(s):

- [ClawHub skill page](https://clawhub.ai/frontendweb/skills/ghost-theme-builder)
- [Ghost CMS](https://ghost.org)
- [Ghost theme structure](docs/structure.md)
- [Ghost theme validation with GScan](docs/gscan.md)
- [Ghost template contexts](reference/contexts.md)
- [Ghost Handlebars helpers](reference/helpers.md)
- [Ghost custom theme settings](docs/custom-settings.md)
- [Ghost dynamic routing](docs/routing.md)

## Skill Output:

**Output Type(s):** [Text, Markdown, Code, Shell commands, Configuration, Guidance]

**Output Format:** [Markdown responses with code blocks, file changes, and shell commands when implementation or validation is requested]

**Output Parameters:** [1D]

**Other Properties Related to Output:** [May inspect or modify Ghost theme files and suggest or run Ghost theme validation or build commands when requested.]

## Skill Version(s):

1.0.9 (source: ClawHub release evidence)

## Ethical Considerations:

Users should evaluate whether this skill is appropriate for their environment, review any generated or modified files before relying on them, and apply their organization's safety, security, and compliance requirements before deployment.
