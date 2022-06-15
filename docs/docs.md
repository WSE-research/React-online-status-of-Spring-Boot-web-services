## Objects

<dl>
<dt><a href="#useApplicationStatus">useApplicationStatus</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#useApplicationStatus">useApplicationStatus([springBootAppUrl], [interval])</a> ⇒ <code><a href="#ApplicationStatus">ApplicationStatus</a></code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ServiceStatus">ServiceStatus</a> : <code>&quot;offline&quot;</code> | <code>&quot;no-cors&quot;</code> | <code>&quot;problem&quot;</code> | <code>&quot;ok&quot;</code></dt>
<dd></dd>
<dt><a href="#HealthStatus">HealthStatus</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ApplicationStatus">ApplicationStatus</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="useApplicationStatus"></a>

## useApplicationStatus : <code>object</code>
**Kind**: global namespace  
<a name="SERVICE_STATUS"></a>

## SERVICE\_STATUS : <code>enum</code>
Enum for states of a Spring Boot service

**Kind**: global enum  
**Read only**: true  
<a name="useApplicationStatus"></a>

## useApplicationStatus([springBootAppUrl], [interval]) ⇒ [<code>ApplicationStatus</code>](#ApplicationStatus)
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [springBootAppUrl] | <code>string</code> | <code>&quot;\&quot;http://localhost:8080\&quot;&quot;</code> | The URL of the Spring Boot service, including port and without *any* routes. |
| [interval] | <code>number</code> | <code>5000</code> | The time in milliseconds between requests checking the status of the service. |

<a name="ServiceStatus"></a>

## ServiceStatus : <code>&quot;offline&quot;</code> \| <code>&quot;no-cors&quot;</code> \| <code>&quot;problem&quot;</code> \| <code>&quot;ok&quot;</code>
**Kind**: global typedef  
<a name="HealthStatus"></a>

## HealthStatus : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | [<code>ServiceStatus</code>](#ServiceStatus) | The state of the service's health endpoint |
| text | <code>string</code> | The precise status or explanation of failure |

<a name="ApplicationStatus"></a>

## ApplicationStatus : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| actuatorStatus | [<code>ServiceStatus</code>](#ServiceStatus) | The state of the Spring Boot actuator endpoint |
| health | [<code>HealthStatus</code>](#HealthStatus) | The status of the service's health endpoint |

